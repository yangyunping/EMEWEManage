using EMEWEManage.Model;
using NetTech;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CusStore.BLL.SoftwareManage
{
    /// <summary>
    /// SoftwareManage 的摘要说明
    /// </summary>
    public class SoftwareManage : HttpHandler
    {
        /// <summary>
        /// 新建和修改
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public string AddOrModify(HttpContext context)
        {
            try
            {
                SoftWareInfo softWareInfo = new SoftWareInfo();
                softWareInfo.NameCH = context.Request.Params["SoftCHName"].ToString();
                softWareInfo.NameEN = context.Request.Params["SoftENName"].ToString();
                softWareInfo.NameData = context.Request.Params["SoftSqlName"].ToString();
                softWareInfo.DataConnectionTest = context.Request.Params["TestConnect"].ToString();
                softWareInfo.DataConnectionOnline = context.Request.Params["NormalConnect"].ToString();
                softWareInfo.ComputerID = context.Request.Params["ComputerID"].ToString();
                softWareInfo.ComputerName = context.Request.Params["ComputerName"].ToString();
                softWareInfo.CodeFilePath = context.Request.Params["CodeFilePath"].ToString();
                softWareInfo.DateFilePath = context.Request.Params["DateFilePath"].ToString();
                softWareInfo.Remark = context.Request.Params["Remark"].ToString();
                softWareInfo.CreateDate = DateTime.Now;
                if (context.Request.Params["SoftID"].ToString() == "" || context.Request.Params["SoftID"] == null)
                {
                    using (EMEWEManageEntities db = new EMEWEManageEntities())
                    {
                        db.SoftWareInfo.Add(softWareInfo);
                        db.SaveChanges();
                    }
                }
                else
                {
                    softWareInfo.ID = Convert.ToInt32(context.Request.Params["SoftID"]);
                    using (EMEWEManageEntities db = new EMEWEManageEntities())
                    {
                        db.Entry(softWareInfo).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }
                }
                return "OK";
            }
            catch (Exception ex)
            {
               return ex.Message;
            }
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public string Del(HttpContext context)
        {
            Hashtable ht = new Hashtable();
            try
            {
                string JsonDataNew = context.Request["JsonDataNew"];
                NameValueCollection data = JsonHelper.GetRequest(JsonDataNew);
                int id  = Convert.ToInt32(data["ID"]);
                using (EMEWEManageEntities db = new EMEWEManageEntities())
                {
                    SoftWareInfo softWareInfo = db.SoftWareInfo.FirstOrDefault(p=>p.ID== id);
                    if (softWareInfo != null)
                    {
                        db.Entry(softWareInfo).State = System.Data.Entity.EntityState.Deleted;
                        db.SaveChanges();
                    }
                }
                ht.Add("Msg", "OK");
            }
            catch (Exception ex)
            {
                ht.Add("Msg", ex.Message);
            }
            return JsonConvert.SerializeObject(new { data = ht }, Formatting.Indented);
        }
        public string Query(HttpContext context)
        {
            try
            {
                int PageSize = Convert.ToInt32(context.Request["PageSize"]);//显示行数
                int PageIndex = Convert.ToInt32(context.Request["PageIndex"]);//页码   
                string JsonDataNew = context.Request["JsonDataNew"];
                NameValueCollection data = JsonHelper.GetRequest(JsonDataNew);
                string strSearchName = data["searchName"].ToString();
                SqlHelper broker = new SqlHelper();
                broker.Open();
                broker.BeginTransaction();
                SqlParameter[] Param ={
                                SqlHelper.GetParameter("@Total",SqlDbType.Int,null),
                                SqlHelper.GetParameter("@PageSize",SqlDbType.Int,PageSize),
                                SqlHelper.GetParameter("@PageIndex",SqlDbType.Int,PageIndex),
                                SqlHelper.GetParameter("@SearchName",SqlDbType.NVarChar,"%"+strSearchName+"%")
                        };
                Param[0].Direction = ParameterDirection.Output;//设置为下标为0的输出参数
                DataTable dt = broker.GetDataTable("Soft_Query", Param);
                string Total = Param[0].Value.ToString();//总条数 
                broker.Close();
                string Result = BootstrapTableHelper.DataToJsonString(Total, dt);//数据组合 
                return (Result);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        /// <summary>
        /// 下载生成Excel
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void Export(HttpContext context)
        {
            try
            {
                string JsonDataNew = context.Request["JsonDataNew"];
                NameValueCollection data = JsonHelper.GetRequest(JsonDataNew);
                string strSearchName = data["searchName"].ToString();
                string sSql = " select * from SoftWareInfo";
                if (!string.IsNullOrEmpty(strSearchName))
                {
                    sSql += $@" NameCH LIKE '%{strSearchName}%' OR  NameEN LIKE '%{strSearchName}%'  Or NameData like '%{strSearchName}%' or ComputerName like  '%{strSearchName}%'";
                }
                SqlHelper broker = new SqlHelper();
                broker.Open();
                DataTable dt = broker.GetDataTable(sSql);
                broker.Close();
                Excel.OutExcelFile(context, dt, "软件信息表");
            }
            catch (Exception ex) { }
        }
        //public string Query(HttpContext context)
        //{
        //    Hashtable ht = new Hashtable();
        //    try
        //    {
        //        ht.Add("Msg", "OK");
        //    }
        //    catch (Exception ex)
        //    {
        //        ht.Add("Msg", ex.Message);
        //    }
        //    return JsonConvert.SerializeObject(new { data = ht }, Formatting.Indented);
        //}
    }
}