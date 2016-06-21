/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

namespace GitSearch {

    declare var returned: any;
    export class GitHubSearch {


        static Init() {
            var search = document.getElementById("SearchTxt");
            search.addEventListener("keydown", function (e) {
                //console.log(e.keyCode);
                if (e.keyCode === 13) {
                    GitSearch.GitHubSearch.Search();
                    console.log("Functions Loaded.");
                }
            });

            var button = $("#SearchButton"); // actually useless.
            button.click(GitHubSearch.Search); // Couldn't get this to work...
        }

        //static clearSearch() {
        //    var container = $("Result");
        //    document.getElementById("Result").innerHTML = "";
        //    //container.empty(); jQuery failed me D:
        //}

        static Search() {
            //GitHubSearch.clearSearch();
            var input = $("#SearchTxt").val();

            console.log("Searching...");
            console.log(input);

            var url = "https://api.github.com/search/repositories?q=" + input;

            $.getJSON(url, function (data) {
                var returned = data.items;
                console.log("Returned Data");

                $.each(returned, function (index, item) {

                    var ownerProfileUrl = item.owner.avatar_url; // maybe i shouldn't use picture to save bandwith.
                    var repoName = item.name;
                    var repoOwner = item.owner.login;
                    var repoForks = item.forks;
                    var repoWatchers = item.watchers;
                    var repoUrl = item.html_url; // don't forget this

                    //html += "<div class='RepoBox clearfix'>";
                    var pressedRepo = item.url;

                    var html = "";
                    var dataRow = $("#dataRow");


                    //var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
                    //console.log(tableRef);

                    //// Insert a row in the table at the last row
                    //var newRow = tableRef.insertRow(tableRef.rows.length);

                    //// Insert a cell in the row at index 0
                    //var newCell = newRow.insertCell(0);

                    //// Append a text node to the cell
                    //var newText = document.createTextNode('New row');
                    //newCell.appendChild(newText);

                    html += "<a href='http://localhost:46206/Views/DisplayView.html" + "?" + pressedRepo + "'</a>";
                    html += "<div class='three columns'>";
                    html += repoName;
                    html += "</div>";
                    html += "<div class='three columns'>";
                    html += repoOwner;
                    html += "</div>";
                    html += "<div class='three columns'>";
                    html += repoWatchers;
                    html += "</div>";
                    html += "<div class='three columns'>";
                    html += repoForks;
                    html += "</div>";


                    //html += "<a href='http://localhost:46206/Views/DisplayView.html" + "?" + pressedRepo + "'</a>";
                    //html += "<tr>";
                    //html += "<td>" + repoName + "</td>";
                    //html += "<td>" + repoOwner + "</td>";
                    //html += "<td>" + repoWatchers + "</td>";
                    //html += "<td>" + repoForks + "</td>";
                    //html += "</tr>";
                    // append to <tbody>
                    dataRow.append(html);
                });
            });
        }
    }
}