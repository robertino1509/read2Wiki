/*! read2Wiki.js
* ================
* The JS application file for read2Wiki. This file
* contains the external link to connect an retrive data 
* from Wikipedia APIs (english version).
*
* @Author  Roberto Aiello
* @Support <http://www.robertoaiello.net>
* @Email   <info@robertoaiello.net>
* @version 0.0.1
* @license MIT <http://opensource.org/licenses/MIT>
*/


$(function () {
    // Handler for .ready() called.


    $('#start').click(function () {


        $('#result').empty();
        $('#info_work').empty();

        if ($('#text_search').val() != '')
            getTextFromWiki($('#text_search').val());
        else
            $('#result').html('');

    });

});

//var titles = "";
var action = "query";
var prop = "extracts";
var format = "json";
var exlimit = "1";

var http_query_call = "https://en.wikipedia.org/w/api.php?";
var http_query = http_query_call + "action=" + action;
http_query += "&prop=" + prop;
http_query += "&format=" + format;
http_query += "&exlimit=" + exlimit;
http_query += "&titles=";

function getTextFromWiki(titles) {

    var query = http_query + titles + '&callback=?';

    $('#info_work').append('Read ' + query);

    var jqxhr = $.getJSON(query, function (data) {
        var pages = data.query.pages;
        $.each(pages, function (key, value_wiki) {

            $('#result').html(print(value_wiki));

        });
    });

    jqxhr.complete(function () {

    });

}

function print(value) {
    var str = '';
    str +=
        '<div class="panel panel-primary">' +
        '<div class="panel-heading">' +
        '<h3 class="panel-title">' + value.title + '</h3>' +
        '</div>' +
        '<div class="panel-body">' +
        '<textarea rows="5" class="form-control" style="min-width: 100%">' + value.extract + '</textarea><br /><br />' +
        value.extract +
        '</div>' +
        '</div>';
    return str;
}


