using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using Excel = Microsoft.Office.Interop.Excel;

namespace LocationTracking.Objects
{
    public class ExcelObject
    {
        public List<String> ReadList = new List<String>();
        public int rowCount;
        public int colCount;

        //public void getExcelFile()
        //{
        //    //DialogResult result;
        //    string searchPattern = "*.xlsx";
        //    //var dialog = new OpenFileDialog();
        //    string fileEntries = null;
        //    //if (dialog != null)
        //   // {
        //        //Instantiate new DialogResult variable
        //        //Purpose: To store the result of FolderBrowserDialog _fbd selection
        //     //   result = new DialogResult();
        //        //Open/Display the _fdb dialog
        //        //Assign the return value to the variable _result
        //      //  dialog.Filter = "xlsx Files (*.xlsx)|*.xlsx";
        //        //result = dialog.ShowDialog();
        //        //Continue with the code only if 'Selected' button is pressed.
        //        //Otherwise (Cancel or Exit) Do nothing
        //        //if (result == System.Windows.Forms.DialogResult.OK)
        //        //{
        //           // string _selectedSourcePath = dialog.FileName;
        //            // _selectedSourcePath  
        //            // fileEntries = Directory.GetFiles(_selectedSourcePathsearchPattern);
        //            if ("" != null)
        //            {
        //                readExcelFile("");
        //            }
        //}
            
        
        public void readExcelFile(string filePath)
        {
            //Create COM Objects. Create a COM object for everything that is referenced
            // Excel.Application xlApp = new Excel.Application();
            //// xlApp.Visible = true;
            // Excel.Workbook xlWorkbook = xlApp.Workbooks.Open(filePath);
            // Excel._Worksheet xlWorksheet = xlWorkbook.Sheets[1];
            // Excel.Range xlRange = xlWorksheet.UsedRange;
            // rowCount = xlRange.Rows.Count;
            // colCount = xlRange.Columns.Count;

            string csvData = File.ReadAllText(filePath);
            try
            {
                using (StreamReader readFile = new StreamReader(filePath))
                {
                    string line;
                    string[] row;
                    while ((line = readFile.ReadLine()) != null)
                    {
                        row = line.Split(',');
                        for(int i =0;i< row.Count();i++)
                        {
                            ReadList.Add(row[i].ToString());
                        }
                        
                    }
                }
            }
            catch (Exception e)
            {
                //MessageBox.Show(e.Message);
            }

            //Object filedValues = new Object[rowCount, colCount];
            ////iterate over the rows and columns 
            ////excel is not zero based!!
            //for (int i = 1; i <= rowCount; i++)
            //{
            //    for (int j = 1; j <= colCount; j++)
            //    {
            //        //filedValues[i-1][j-1] = xlRange.Cells[i, j].Value2.ToString();
            //        // ReadList.Add(xlRange.Cells[i, j].Value2.ToString());
            //        // ReadList.Add(xlRange.Cells[i, j].ToString());

            //        ReadList.Add(csvData[i, j].ToString());

            //    }
            //}
            ////cleanup
            //GC.Collect();
            //GC.WaitForPendingFinalizers();


            ////release com objects to fully kill excel process from running in the background
            //Marshal.ReleaseComObject(xlRange);
            //Marshal.ReleaseComObject(xlWorksheet);

            ////close and release
            //xlWorkbook.Close();
            //Marshal.ReleaseComObject(xlWorkbook);

            ////quit and release
            //xlApp.Quit();
            //Marshal.ReleaseComObject(xlApp);

            //return filedValues;
        }
        public void getSaveLocation()
        {
           // DialogResult result;
           // var dialog = new OpenFileDialog();
            string fileEntries = null;
          //  if (dialog != null)
           // {
                //Instantiate new DialogResult variable
                //Purpose: To store the result of FolderBrowserDialog _fbd selection
            //    result = new DialogResult();

          //  }

        }
        public string saveDestination()
        {
            string _selectedSourcePath = "";

          //  DialogResult result;
            //string searchPattern = "*.xlsx";
         //   var dialog = new FolderBrowserDialog();

            string fileEntries = null;


            string dummyFileName = "Do Not Type Name Here";

          //  SaveFileDialog sf = new SaveFileDialog();
            // Feed the dummy name to the save dialog
       //     sf.FileName = dummyFileName;

         //   if (sf.ShowDialog() == DialogResult.OK)
         //   {
                // Now here's our save folder
         //       _selectedSourcePath = Path.GetDirectoryName(sf.FileName);
                // Do whatever
         //   }


            return _selectedSourcePath;
        }
        //public bool writeToExcel(DataSet ds)
        //{
        //    bool success = false;
        //    Excel.Application xlApp;
        //    Excel.Workbook xlWorkBook;
        //    Excel.Worksheet xlWorkSheet;
        //    object misValue = System.Reflection.Missing.Value;
        //    string data = null;

        //    xlApp = new Excel.Application();
        //    xlWorkBook = xlApp.Workbooks.Add(misValue);
        //    xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

        //    foreach (System.Data.DataTable dt in ds.Tables)
        //    {
        //        for (int i1 = 0; i1 < dt.Columns.Count; i1++)
        //        {
        //            xlWorkSheet.Cells[1, i1 + 1] = dt.Columns[i1].ColumnName;
        //        }
        //    }
        //    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
        //    {
        //        int s = i + 1;
        //        for (int j = 0; j <= ds.Tables[0].Columns.Count - 1; j++)
        //        {
        //            data = ds.Tables[0].Rows[i].ItemArray[j].ToString();
        //            xlWorkSheet.Cells[s + 1, j + 1] = data;
        //        }
        //    }


        //    //xlWorkBook.TableStyles. = "TableStyleMedium3";
        //    string reportTime = DateTime.Now.ToString("ddMMMyyyy,HHmm");
        //    object m_strSampleFolder = saveDestination();
        //    string reportName = "RemakeExport-" + reportTime + ".xls";
        //    string reportPath = string.Format("{0}{1}", m_strSampleFolder, reportName);
        //    try
        //    {
        //        xlWorkBook.SaveAs(reportPath, Excel.XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue,
        //        misValue, Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue,
        //        misValue, misValue);
        //        xlWorkBook.Close(true, misValue, misValue);
        //        xlApp.Quit();
        //        success = true;

        //    }
        //    catch (Exception e)
        //    {
        //        success = false;
        //    }


        //    GC.Collect();
        //    GC.WaitForPendingFinalizers();

        //    //release com objects to fully kill excel process from running in the background

        //    Marshal.ReleaseComObject(xlWorkSheet);

        //    //close and release
        //    //xlWorkBook.Close();
        //    //Marshal.ReleaseComObject(xlWorkBook);

        //    //quit and release
        //    xlApp.Quit();
        //    Marshal.ReleaseComObject(xlApp);



        //    return success;


        //}
    }
}