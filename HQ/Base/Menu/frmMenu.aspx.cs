﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CusStoreWeb.HQ.Base.Menu
{
    public partial class frmMenu : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            NetTech.Check.LoginState();
        }
    }
}