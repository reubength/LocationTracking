using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using LocationTracking.Models;

namespace LocationTracking.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();


            ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

            string rolename = userManager.GetRoles(user.Id).FirstOrDefault(); //await userManager.GetRoles(user.Id).FirstOrDefault();
         //   string claim = userManager.GetClaimsAsync(user.Id).ToString();
           // string Dept  = userManager.g
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }
           // userManager.AddToRole(user.UserName, user.Roles);

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager,
                OAuthDefaults.AuthenticationType);
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager,
                CookieAuthenticationDefaults.AuthenticationType);

            //oAuthIdentity.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
           
            //  oAuthIdentity.AddClaim(new Claim(ClaimTypes.Role, "User"));

            AuthenticationProperties properties = CreateProperties(user.UserName);
            properties.Dictionary.Add("Role", rolename);
       //     properties.Dictionary.Add("Claim", claim);


            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);

            //Something needs investigating

            //public async string GetUserRole(string EmailID, string Password)
            //{
            //    var user = await _userManager.FindAsync(EmailID, Password);
            //    string rolename = await _userManager.GetRoles(user.Id).FirstOrDefault();
            //    return rolename;
            //}

        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
    }
}