﻿/// <reference path="../scripts/typings/jquery/jquery.d.ts" />

function GetRepoData() {
    var parameters = location.search.substring(1).split("&");
    var url = parameters[0];

    $.getJSON(url, function (data) {
        // Example of what i get https://api.github.com/repos/Redliquids/Assignment-7-Hide-Text

        var returned = data;

        var RepoName = data.full_name; // Title
        var RepoOwner = data.owner.login;
        var RepoOwnerPic = data.owner.avatar_url;
        console.log(RepoOwnerPic);
        var RepoForkCount = data.forks_count;
        var RepoWatchersCount = data.watchers_count;
        var RepoLanguage = data.language;
        var RepoSubscribers = data.subscribers_count;
        var RepoContributorsUrl = data.contributors_url; // This will be used to get the data on the contributors

        $("repoTitle").text = RepoName;

        var Information = $("#Information");// Selector

        var htmlInfo = "";

        htmlInfo += '<div>';
        htmlInfo += '<strong>Owner: </strong>';
        htmlInfo += '<img src=' + '"' + RepoOwnerPic + '">';
        htmlInfo += '<strong> ' + RepoOwner + '</strong>';
        htmlInfo += '<div>';
        htmlInfo += '<strong>Forks: </strong>';
        htmlInfo += RepoForkCount;
        htmlInfo += '</div>';
        htmlInfo += '<div>';
        htmlInfo += '<strong>Watchers: </strong>';
        htmlInfo += RepoWatchersCount;
        htmlInfo += '</div>';
        htmlInfo += '<div>';
        htmlInfo += '<strong>Subscribers: </strong>';
        htmlInfo += RepoSubscribers;
        htmlInfo += '</div>';
        htmlInfo += '<div>';
        htmlInfo += '<strong>Language: </strong>';
        htmlInfo += RepoLanguage;
        htmlInfo += '</div>';
        htmlInfo += '<div>';
        //htmlInfo += '<strong>Issues: </strong>';
        //htmlInfo += 
        htmlInfo += '</div>';
        htmlInfo += '<div>';

        Information.html(htmlInfo);

        $.getJSON(RepoContributorsUrl, function (object) {
            var contributorsData = data;

            $.each(object, function (index, Informaion) {

                var user = Informaion.login;
                var userPic = Informaion.avatar_url;
                var userLink = Informaion.url;

                var Contributorsbody = $("#Contributorstbody");//Selector
                var appendConotributors = "";

                appendConotributors = "<tr>";
                    appendConotributors += "<td>";
                        appendConotributors += "<img src='" + userPic + "'"+ 'style="width:25px;"' +"/>";
                    appendConotributors += "</td>";

                    appendConotributors += "<td>";
                        //appendRow += "<a href='" + userLink + ">";
                        appendConotributors += user;
                        //appendRow += "</a>";
                    appendConotributors += "</td>";
                appendConotributors += "</tr>";
                Contributorsbody.append(appendConotributors);
            });
        });
        // Inside first $.getJSON

        var RepoIssues = data.issues_url;

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        //// What we get: https://api.github.com/repos/Redliquids/Assignment-7-Hide-Text/issues{/number} ////
        //// What we get: https://api.github.com/repos/drewhannay/chess/issues{/number}                  ////
        //// We have to remove: {/number}                                                                ////
        /////////////////////////////////////////////////////////////////////////////////////////////////////

        var split = RepoIssues.split("{");
        var RepoIssuesTrimmed = split[0];

        $.getJSON(RepoIssuesTrimmed, function (object) {

            // each issue. Display: object.title
            $.each(object, function (index, Issue) {

                var issueTitle = Issue.title;

                var IssuesSelector = $("#Issuestbody");
                var issuehtml = "";

                issuehtml += "<tr>";
                issuehtml += "<td>";
                issuehtml += issueTitle;
                issuehtml += "</td>";
                issuehtml += "</tr>";

                IssuesSelector.append(issuehtml);
            });
        });
        //Inside Function
    });
}