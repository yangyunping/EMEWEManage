﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CusStoreWeb.HQ.Base.User
{
    public partial class frmUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            NetTech.Check.LoginState();
        }
    }
}