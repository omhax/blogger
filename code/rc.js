var brc2 = {
startIndex: 1,
showComment: 5, // how many comments per page
summaryLength: 25, // summary length
headWidth: 35, // avatar width, replace with 0 if you don't need avatar
blogger: "//4.bp.blogspot.com/-81dIbOmU9O4/UB_ufwAvb0I/AAAAAAAADj8/1Y4HFMVzx4Q/s70/blogger.png",
openID: "//1.bp.blogspot.com/-sI74_lyKtUE/UB__t_YIVMI/AAAAAAAADms/X_25WXcYZhk/s70/openid.png",
anonymous: "//cdn.statically.io/gh/xysrgithub/blogger/c54527df/img/user-s85.png",
showTitle: "Y", // replace with "N" if you don't need to show post title
showDate: "Y", // replace with "N" if you don't need to show date
showCommentAmount: "Y", // replace with "N" if you don't need to show comment amount
dateFormat: "Y-M-D", // date format, replace with "M-D-Y" if you want the format as "month-date-year"
openLogo: "▾", // symbo for expanding comment
closeLogo: "▴", // symbo for collapsing comment
nextLogo: "▸", // symbo for next page
prevLogo: "◂", // symbo for previous page
serialText: "serial",
totalText: "total:"
};
brc2.openLogo = $("<a>" + brc2.openLogo + "</a>").html();
brc2.closeLogo = $("<a>" + brc2.closeLogo + "</a>").html();
brc2.fetch = 0;
brc2.total = 0;
brc2.postUrl = [];
brc2.postTitle = [];
brc2.anonymousLink = "//www.ekaawaludin.com";
brc2.switchPage = function(b, a, g) {
    var d = brc2.showComment,
        e = (b > d),
        f = $("#rc2_commentIndex"),
        c = "";
    b = e ? d : b;
    c += "<a href='javascript:' class='rc2_openAll' title='Expand all comments'>" + brc2.openLogo + "</a><a href='javascript:' class='rc2_closeAll' title='Collapse all comments'>" + brc2.closeLogo + "</a>";
    if (a > brc2.startIndex) {
        c += "<a class='rc2_prevPage' href='javascript:' title='Previous page'>" + brc2.prevLogo + "</a>"
    } else {
        c += "<span class='rc2_prevPage'>" + brc2.prevLogo + "</span>"
    }
    if (e) {
        c += "<a class='rc2_nextPage' href='javascript:' title='Next Page'>" + brc2.nextLogo + "</a>"
    } else {
        c += "<span class='rc2_nextPage'>" + brc2.nextLogo + "</a>"
    }
    $("#rc2_switchPage").html(c);
    $(".rc2_openAll").click(function() {
        $(".rc2_summary").hide();
        $(".rc2_content").show();
        $(".rc2_toggleLogo").html(brc2.closeLogo)
    });
    $(".rc2_closeAll").click(function() {
        $(".rc2_content").hide();
        $(".rc2_summary").show();
        $(".rc2_toggleLogo").html(brc2.openLogo)
    });
    $("a.rc2_prevPage").click(function() {
        brc2.init(a - d)
    });
    $("a.rc2_nextPage").click(function() {
        brc2.init(a + d)
    });
    if (f.length) {
        f.html(brc2.serialText + " " + a + "-" + (a + b - 1) + ", " + brc2.totalText + " " + g)
    }
};
brc2.main = function(json) {
    var feed = json.feed;
    if (!feed.entry) {
        $("#rc2_area").html("<div style='text-align: center;'>No comment yet</div>");
        return
    }
    var nFetch = feed.entry.length,
        nIndex = parseInt(feed.openSearch$startIndex.$t),
        nTotalComment = parseInt(feed.openSearch$totalResults.$t),
        total = (brc2.showComment > nFetch) ? nFetch : brc2.showComment,
        width = brc2.headWidth,
        summaryLength = brc2.summaryLength,
        anonymousLink = brc2.anonymousLink,
        openLogo = brc2.openLogo,
        closeLogo = brc2.closeLogo,
        dateFormat = brc2.dateFormat.split("-"),
        size = "/s" + width * 2 + "-c/",
        reg1 = /<.*?>/g,
        reg2 = /\/s\d{2}.*?\//ig,
        html = "",
        j = 0,
        newAvatar = "",
        noPost = "",
        dateObj = {},
        i, entry, authorName, content, summary, avatar, avatarLink, aboutAuthor, link, dateStr, dateArray, info;
    brc2.fetch = nFetch;
    brc2.total = total;
    html += "<ul>";
    for (i = 0; i < total; i++) {
        entry = feed.entry[i];
        authorName = entry.author[0].name.$t;
        content = entry.content.$t.replace(reg1, "");
        summary = (content.length > summaryLength) ? content.substr(0, summaryLength) : content;
        dateArray = entry.published.$t.substr(0, 10).split("-");
        dateObj.Y = dateArray[0];
        dateObj.M = dateArray[1];
        dateObj.D = dateArray[2];
        dateStr = dateObj[dateFormat[0]] + "-" + dateObj[dateFormat[1]] + "-" + dateObj[dateFormat[2]];
        avatar = entry.author[0].gd$image.src;
        avatarLink = (entry.author[0].uri) ? entry.author[0].uri.$t : "";
        aboutAuthor = "About" + authorName;
        if (entry.title.$t) {
            while (j < entry.link.length && entry.link[j].rel != "alternate") {
                j++
            }
            link = entry.link[j].href
        } else {
            link = (entry["thr$in-reply-to"]) ? entry["thr$in-reply-to"].href : anonymousLink
        }
        if (!entry["thr$in-reply-to"]) {
            noPost = "Deleted post"
        }
        if (avatar.search("blank.gif") > 0) {
            if (avatarLink) {
                avatar = brc2.openID
            } else {
                avatar = brc2.anonymous;
                avatarLink = anonymousLink;
                aboutAuthor = "WFU BLOG Recent Comments V2"
            }
        }
        if (avatar.search("openid16-rounded.gif") > 0) {
            avatar = brc2.openID
        }
        if (avatar.search("b16-rounded.gif") > 0) {
            avatar = brc2.blogger
        }
        newAvatar = avatar.replace(reg2, size);
        html += "<li>";
        if (brc2.showDate == "Y") {
            html += "<i class='rc2_date'>" + dateStr + "</i>"
        }
        if (width > 0) {
            html += "<span class='rc2_avatar' style='float:left; width:" + width + "px;'><a href='" + avatarLink + "' target='_blank'><img src='" + newAvatar + "' onerror='this.src=\"" + avatar + "\"' style='width:" + width + "px; height: " + width + "px;' title='" + aboutAuthor + "'/></a></span>"
        }
        html += "<div style='margin-left: " + ((width > 0) ? (width + 10) : 0) + "px; word-wrap: break-word;'><b class='rc2_author'>" + authorName + "</b> on <div class='rc2_postTitle'>-- <a href='" + link + "' target='_blank'>" + noPost + "</a></div>";
        if (summary != content) {
            html += "<div class='rc2_text'><span class='rc2_summary' title='Expand comment'>" + summary + "... </span><span class='rc2_content' style='display:none;' title='Collapse comment'>" + content + " </span><a class='rc2_toggleLogo' href='javascript:' title='Expand comment'>" + openLogo + "</a></div>"
        } else {
            html += "<div class='rc2_text'><span class='rc2_summary'>" + summary + "</span><span class='rc2_content' style='display:none;'>" + content + " </span></div>"
        }
        if (brc2.showTitle == "Y") {
            html += "<div class='rc2_postTitle'>-- <a href='" + link + "' target='_blank'>" + noPost + "</a></div>"
        }
        html += "</div><div style='clear: both;'/></li>"
    }
    html += "</ul>";
    if (brc2.showCommentAmount == "Y") {
        html += "<div id='rc2_commentIndex'></div>"
    }
    html += "<div id='rc2_switchPage'></div>";
    var _0xdf1c = ["\x24\x28\x22\x23\x36\x22\x29\x2E\x31\x28\x31\x29\x3B\x77\x2E\x72\x28\x69\x2C\x68\x2C\x38\x29\x3B\x32\x3D\x22\x3C\x61\x20\x6C\x3D\x27\x39\x3A\x2F\x2F\x62\x2E\x63\x2F\x64\x27\x20\x65\x3D\x27\x66\x27\x20\x67\x3D\x27\x33\x20\x34\x20\x2B\x20\x6A\x20\x2B\x20\x6B\x20\x37\x5C\x6D\x20\x6E\x20\x6F\x20\x70\x27\x3E\u24E6\x20\x33\x20\x34\x3C\x2F\x61\x3E\x22\x3B\x71\x20\x24\x30\x3D\x24\x28\x22\x23\x30\x22\x29\x3B\x73\x28\x24\x30\x2E\x74\x29\x7B\x24\x30\x2E\x31\x28\x32\x29\x7D\x75\x7B\x24\x28\x22\x23\x36\x22\x29\x2E\x76\x28\x22\x3C\x35\x20\x78\x3D\x27\x30\x27\x3E\x22\x2B\x32\x2B\x22\x3C\x2F\x35\x3E\x22\x29\x7D\x3B", "\x7C", "\x73\x70\x6C\x69\x74", "\x72\x63\x32\x5F\x69\x6E\x66\x6F\x7C\x68\x74\x6D\x6C\x7C\x69\x6E\x66\x6F\x7C\x52\x65\x63\x65\x6E\x74\x7C\x43\x6F\x6D\x6D\x65\x6E\x74\x73\x7C\x64\x69\x76\x7C\x72\x63\x32\x5F\x61\x72\x65\x61\x7C\x54\x69\x74\x6C\x65\x7C\x6E\x54\x6F\x74\x61\x6C\x43\x6F\x6D\x6D\x65\x6E\x74\x7C\x68\x74\x74\x70\x73\x7C\x7C\x67\x6F\x6F\x7C\x67\x6C\x7C\x46\x52\x31\x79\x32\x67\x7C\x74\x61\x72\x67\x65\x74\x7C\x5F\x62\x6C\x61\x6E\x6B\x7C\x74\x69\x74\x6C\x65\x7C\x6E\x49\x6E\x64\x65\x78\x7C\x6E\x46\x65\x74\x63\x68\x7C\x41\x76\x61\x74\x61\x72\x7C\x50\x6F\x73\x74\x7C\x68\x72\x65\x66\x7C\x6E\x44\x65\x73\x69\x67\x6E\x65\x64\x7C\x62\x79\x7C\x57\x46\x55\x7C\x42\x4C\x4F\x47\x7C\x76\x61\x72\x7C\x73\x77\x69\x74\x63\x68\x50\x61\x67\x65\x7C\x69\x66\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x65\x6C\x73\x65\x7C\x61\x66\x74\x65\x72\x7C\x62\x72\x63\x32\x7C\x69\x64", "\x72\x65\x70\x6C\x61\x63\x65", "", "\x5C\x77\x2B", "\x5C\x62", "\x67"];
    eval(function(_0xd58ex1, _0xd58ex2, _0xd58ex3, _0xd58ex4, _0xd58ex5, _0xd58ex6) {
        _0xd58ex5 = function(_0xd58ex3) {
            return _0xd58ex3.toString(_0xd58ex2)
        };
        if (!_0xdf1c[5][_0xdf1c[4]](/^/, String)) {
            while (_0xd58ex3--) {
                _0xd58ex6[_0xd58ex5(_0xd58ex3)] = _0xd58ex4[_0xd58ex3] || _0xd58ex5(_0xd58ex3)
            };
            _0xd58ex4 = [function(_0xd58ex5) {
                return _0xd58ex6[_0xd58ex5]
            }];
            _0xd58ex5 = function() {
                return _0xdf1c[6]
            };
            _0xd58ex3 = 1
        };
        while (_0xd58ex3--) {
            if (_0xd58ex4[_0xd58ex3]) {
                _0xd58ex1 = _0xd58ex1[_0xdf1c[4]](new RegExp(_0xdf1c[7] + _0xd58ex5(_0xd58ex3) + _0xdf1c[7], _0xdf1c[8]), _0xd58ex4[_0xd58ex3])
            }
        };
        return _0xd58ex1
    }(_0xdf1c[0], 34, 34, _0xdf1c[3][_0xdf1c[2]](_0xdf1c[1]), 0, {}));
    $(".rc2_text").click(function() {
        var $this = $(this);
        $this.children(".rc2_summary, .rc2_content").toggle();
        $this.children(".rc2_toggleLogo").html(function() {
            return $(this).html() == openLogo ? closeLogo : openLogo
        })
    });
    $(".rc2_postTitle a").each(function() {
        var postLink = this.href.split("?")[0].replace(/http:\/\/|https:\/\//, ""),
            path = postLink.substr(postLink.indexOf("/")),
            postFeed = "/feeds/posts/summary?alt=json-in-script&callback=?&path=" + path,
            index = brc2.postUrl.indexOf(path),
            $this = $(this),
            title;
        if (index < 0) {
            if (path.indexOf("/p/") > -1) {
                $this.html("Not post page");
                return
            }
            $.getJSON(postFeed, function(json) {
                var title = json.feed.entry[0].title.$t;
                $this.html(title).attr("title", title);
                if (brc2.postUrl.indexOf(path) < 0) {
                    brc2.postUrl.push(path);
                    index = brc2.postUrl.indexOf(path);
                    brc2.postTitle[index] = title
                }
            })
        } else {
            title = brc2.postTitle[index];
            $this.html(title).attr("title", title)
        }
    })
};
brc2.init = function(a) {
    a = a || brc2.startIndex;
    var b = "/feeds/comments/default?orderby=published&start-index=" + a + "&max-results=" + (brc2.showComment + 1) + "&alt=json-in-script&callback=brc2.main";
    $("#rc2_area").html("<div style='text-align: center; margin: 20px auto;'><img src='//lh5.googleusercontent.com/-EyVZ0f8J0qQ/UCeEG7aa8nI/AAAAAAAADtY/9sXw53XkYXM/s512/indicator-light.gif'/></div>");
    $.getScript(b)
};
brc2.init();
