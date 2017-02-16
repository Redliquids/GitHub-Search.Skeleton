/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

namespace GitSearch {

    declare var returned: any;
    export class GitHubSearch {



        static Init() {
            var search = document.getElementById("SearchTxt");
            search.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {
                    GitSearch.GitHubSearch.Search();
                    console.log("Functions Loaded.");
                }
            });
        }

        static Search() {
            // Clear past search results.
            document.getElementById("tbody").innerHTML = "";

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

                    var pressedRepo = item.url;

                    var html = "";
                    var dataRow = $("#tbody");



                    html += "<tr  class='searchResults'";
                    html += "<td><a href=http://localhost:46206/Views/DisplayView.html" + "?" + pressedRepo + ">" + repoName + "</a></td>";
                      html += "<td>" + repoOwner + "</td>";
                      html += "<td>" + repoWatchers + "</td>";
                      html += "<td>" + repoForks + "</td>";
                    html += "</tr>";

                    // append to <tbody>
                    dataRow.append(html);
                });
            });
        }
    }
}