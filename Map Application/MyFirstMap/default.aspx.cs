/*
 *  Name:           Rebecca Harris
 *  Project:        Mapping Application 3
 *  Date:           April 1, 2014
 *  File name:      default.aspx.cs
 *  Browser:        Google Chrome
 *  Description:    Contains the classes that hold the information of Factual data for places found in a certain area.
 *                  The GetFactual method grabs the Factual data for places (max 50) around the location the user is
 *                  currently on in the map. It then passes the array containing the details about each place to the 
 *                  AJAX call in default.js (this is where the GetFactual method originally gets called).
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using FactualDriver;
using FactualDriver.Filters;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MyFirstMap
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        // My Factual key and secret to be passed into a Factual object
        const string MY_KEY = "uMmBDTymQSIVSOvPYtNUoVGnDdzKSBbICDZrF2FY";
        const string MY_SECRET = "RwtHaVgUMtAUOypXqHca26Zd7AsYa3ZnvYJKqGhc";

        // Rootobject class - contains the Response class, version, and status for each place 
        public class Rootobject
        {
            public int version { get; set; }
            public string status { get; set; }
            public Response response { get; set; }
        }

        // Response class - array of the Datum class (details about the places)
        public class Response
        {
            public Datum[] data { get; set; }
            public int included_rows { get; set; }
        }

        // Datum class - details for the places
        public class Datum
        {
            public string region { get; set; }
            public string status { get; set; }
            public string website { get; set; }
            public string tel { get; set; }
            public string[] neighborhood { get; set; }
            public string postcode { get; set; }
            public string[][] category_labels { get; set; }
            public string country { get; set; }
            public int[] category_ids { get; set; }
            public string address { get; set; }
            public string name { get; set; }
            public string locality { get; set; }
            public double longitude { get; set; }
            public double latitude { get; set; }
            public string address_extended { get; set; }
            public string factual_id { get; set; }
            public float distance { get; set; }
        }
        
        // Gets the factual data for places within a certain area
        [WebMethod]
        public static Datum[] GetFactual(double dLat, double dLon)
        {
            // Factual object using my Factual key and secret
            Factual factual = new Factual(MY_KEY, MY_SECRET);

            factual.ConnectionTimeout = null;
            factual.ReadTimeout = null;

            // New query object that specifically looks at category ID #338 in Factual
            Query query = new Query().Field("category_ids").Includes(338).WithIn(new Circle(dLat, dLon, 4000)).Limit(50);
            string factualJson = factual.Fetch("places",query);

            // Turns the string into a Rootobject, containing all the details of the place (the place's name, lat, long, etc).
            Rootobject factualData = JsonConvert.DeserializeObject<Rootobject>(factualJson);

            // Returns an array of Datum objects that contain the details about the places found
            return factualData.response.data;
        }
    }
}