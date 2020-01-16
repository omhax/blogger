function mementomag_recent_comment(a) {
    var e, t = "a",
        r = "b",
        n = "c",
        o = "l",
        i = "m",
        s = "o",
        l = "p",
        d = "s",
        v = "t";
    e = '<ul class="mementomag_recent_comment">';
    for (var m = 0; numComments > m; m++) {
        var c, f, g, A;
        if (m == a.feed.entry.length) break;
        e += "<li>";
        for (var h = a.feed.entry[m], u = 0; u < h.link.length; u++) "alternate" == h.link[u].rel && (c = h.link[u].href);
        for (var post_title = "<data:post.title/>");
        for (var p = 0; p < h.author.length; p++) f = h.author[p].name.$t, g = h.author[p].gd$image.src;
        g = -1 != g.indexOf("/s1600/") ? g.replace("/s1600/", "/s" + avatarSize + "-c/") : -1 != g.indexOf("/s220/") ? g.replace("/s220/", "/s" + avatarSize + "-c/") : -1 != g.indexOf("/s512-c/") && 0 != g.indexOf("") ? "" + g.replace("/s512-c/", "/s" + avatarSize + "-c/") : -1 != g.indexOf("blogblog.com/img/b16-rounded.gif") ? "https://cdn.statically.io/gh/xysrgithub/blogger/c54527df/img/user-s85.png" : -1 != g.indexOf("blogblog.com/img/openid16-rounded.gif") ? "https://cdn.statically.io/gh/xysrgithub/blogger/c54527df/img/user-s85.png" : -1 != g.indexOf("blogblog.com/img/blank.gif") ? -1 != defaultAvatar.indexOf("gravatar.com") ? defaultAvatar + "&s=" + avatarSize : defaultAvatar : g, 1 == showAvatar && (A = 1 == roundAvatar ? "avatarImage" : "", e += '<div class="avatarClass"><img class="' + A + '" src="' + g + '" alt="' + f + '" title="' + f + '" width="' + avatarSize + '" height="' + avatarSize + '"/></div>'), e += ' + f + "</a> on <a class="author" target="_blank" title="' + f + '" href="' + c + '">' + post_title + "</a>";
        var k = h.content.$t,
            x = k.replace(/(<([^>]+)>)/gi, "");
        "" != x && x.length > characters ? (x = x.substring(0, characters), x += "&hellip;", 1 == showMorelink && (x += '<a target="_blank" title="' + moreLinktext + '"href="' + c + '">' + moreLinktext + "</a>")) : x = x, e += "<span>" + x + "</span>", e += "</li>"
    }
    e += "</ul>", e += '<a style="font-size:0px" title="' + f + '"href="//m' + t + d + v + t + i + "van." + r + o + "og" + d + l + "ot." + n + s + i + '">' + i + t + d + " t" + t + i + "van.</a>";
    var b = ".xxx";
    1 == hideCredits && (b = "display:none;"), document.write(e)
}
