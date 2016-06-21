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

        var Information = $("#Information");// Selector


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

                var Contributors = $("#Contributors");//Selector
                var htmlContributors = "";
                htmlContributors += "<div class='Contributors clearfix'>";
                htmlContributors += "<a href='" + userLink + "'</a>";// Link to the user you clicked
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

                var Issues = $("#OpenIssues");//Selector
                var htmlIssues = "";
                htmlIssues += "<div class='IssuesBox clearfix'>";
                htmlIssues += "<a href='" + issueLink + "'</a>";// Link to the user you clicked
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