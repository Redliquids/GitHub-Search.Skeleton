/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var GitSearch;
(function (GitSearch) {
    var GitHubSearch = (function () {
        function GitHubSearch() {
        }
        GitHubSearch.Init = function () {
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
        };
        //static clearSearch() {
        //    var container = $("Result");
        //    document.getElementById("Result").innerHTML = "";
        //    //container.empty(); jQuery failed me D:
        //}
        GitHubSearch.Search = function () {
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
        };
        return GitHubSearch;
    }());
    GitSearch.GitHubSearch = GitHubSearch;
})(GitSearch || (GitSearch = {}));
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
function GetRepoData() {
    var parameters = location.search.substring(1).split("&");
    var url = parameters[0];
    $.getJSON(url, function (data) {
        // Example of what i get https://api.github.com/repos/Redliquids/Assignment-7-Hide-Text
        var returned = data;
        var RepoName = data.full_name; // Title
        var RepoOwner = data.owner.login;
        var RepoForkCount = data.forks_count;
        var RepoWatchersCount = data.watchers_count;
        var RepoLanguage = data.language;
        var RepoSubscribers = data.subscribers_count;
        var RepoContributorsUrl = data.contributors_url; // This will be used to get the data on the contributors
        var Information = $("#Information"); // Selector
        var htmlInfo = "";
        htmlInfo += RepoName;
        htmlInfo += RepoName;
        htmlInfo += RepoOwner;
        htmlInfo += RepoForkCount;
        htmlInfo += RepoWatchersCount;
        htmlInfo += RepoLanguage;
        htmlInfo += RepoSubscribers;
        Information.html(htmlInfo);
        $.getJSON(RepoContributorsUrl, function (object) {
            var contributorsData = data;
            $.each(object, function (index, Informaion) {
                var user = Informaion.login;
                var userPic = Informaion.avatar_url;
                var userLink = Informaion.url;
                var Contributors = $("#Contributors"); //Selector
                var htmlContributors = "";
                htmlContributors += "<div class='Contributors clearfix'>";
                htmlContributors += "<a href='" + userLink + "'</a>"; // Link to the user you clicked
                htmlContributors += "<img src='" + userPic + "'/>";
                htmlContributors += "<div>";
                htmlContributors += "   <div>";
                htmlContributors += "<strong>" + user + "</strong>";
                //htmlContributors += user;
                htmlContributors += "   </div>";
                htmlContributors += "</div>";
                Contributors.append(htmlContributors);
            });
        });
        // Inside first $.getJSON
        var RepoIssues = data.issues_url;
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        //// What we get: https://api.github.com/repos/Redliquids/Assignment-7-Hide-Text/issues{/number} ////
        //// What we get: https://api.github.com/repos/drewhannay/chess/issues{/number}                  ////
        //// We have to remove: {/number}                                                                ////
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log("NOT Trimmed url: " + RepoIssues);
        var split = RepoIssues.split("{");
        var RepoIssuesTrimmed = split[0];
        $.getJSON(RepoIssuesTrimmed, function (object) {
            // each issue. Display: object.title
            $.each(object, function (index, Issue) {
                var issueTitle = Issue.title;
                var issueLink = "placeholder";
                var htmlIssues = "";
                var Issues = $("#OpenIssues"); //Selector
                var htmlIssues = "";
                htmlIssues += "<div class='IssuesBox clearfix'>";
                htmlIssues += "<a href='" + issueLink + "'</a>"; // Link to the user you clicked
                htmlIssues += "<div>";
                htmlIssues += "   <div>";
                htmlIssues += "<strong>" + issueTitle + "</strong>";
                htmlIssues += "   </div>";
                htmlIssues += "</div>";
                Issues.append(htmlIssues);
            });
        });
        //Inside Function
    });
}
//# sourceMappingURL=main.js.map