<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="MyFirstMap._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Map Application 3 - Rebecca Harris</title>
    <link rel="stylesheet" href="Content/bootstrap.css"media="screen" />
    <link rel="stylesheet" href="Content/bootstrap.min.css" />
    <script type="text/javascript" src="scripts/jquery-1.7.1.js"></script>
    <link rel="stylesheet" href="styles/default.css"/>
    <script type="text/javascript" src="scripts/key.js"></script>
    <script type="text/javascript" src="scripts/default.js"></script>
    <script type="text/JavaScript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1"/>
</head>
<body onload="boot();">
    <form id="form1" runat="server">
        <div id="mainHead" class="jumbotron">
            <div class="container">
                <h1>Cup of Joe on the Go</h1>
                <blockquote>... and maybe a donut or two</blockquote>
            </div>
        </div>

        <div id="mainCont">
            <div class="container">
                <div id="flex">
                    <div id="bingMap"></div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="nav nav-tabs" id="tabCont" data-tabs="tabCont">
                            <li class="active"><a href="#home" data-toggle="tab">Map Options</a></li>
                            <li><a href="#pin" data-toggle="tab">Pin Information</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade active in" id="home">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3>Map Options</h3>
                                    </div>
                                    <div class="panel-body">
                                        <input id="cbCoffee" type="checkbox" checked="checked" onchange="cbClicked(this)">Cafe, Coffee and Tea Houses<br />
                                        <input id="cbBakeries" type="checkbox" checked="checked" onchange="cbClicked(this)">Bakeries<br />
                                        <input id="cbBagels" type="checkbox" checked="checked" onchange="cbClicked(this)">Bagels and Donuts<br />
                                        <input id="cbInternetCafe" type="checkbox" checked="checked" onchange="cbClicked(this)">Internet cafes<br />
                                        <br />
                                        <div class="btn-group">
                                        <input id="btnLoad" type="button" class="btn btn-default" value="Search" onclick="getFactual();" />
                                        <input id="btnGeo" type="button" class="btn btn-default" value="Current Location" onclick="manualLocation();" />
                                        </div>
                                        <br />
                                        <br />
                                        <p id="numPins" class="NumPins"></p>                            
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pin">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3>Pin Information</h3>
                                    </div>
                                    <div class="panel-body">
                                        <div id="mapResults" class="MapResults">
                                            <p id="pinInfo">Please select a pin.</p>
                                            <p id="pinName" class="PinName"></p>
                                            <p id="pinAddr" class="PinAddr"></p>
                                            <p id="pinLat" class="PinLat"></p>
                                            <p id="pinLon" class="PinLon"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="botFoot" class="container">
            <nav class="navbar navbar-default navbar-fixed-bottom">
                <div class="navbar-inner navbar-content-center">
                    <a href="#top">Back to top</a>
                    <p>Rebecca Harris - Map Application 3, 2014</p>
                </div>
            </nav>
        </div>
    </form>

    <script type="text/javascript" src="scripts/bootstrap.js"></script>

</body>
</html>
