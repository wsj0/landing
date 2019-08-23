define(function (require) {
    require("common");
    var a = require("/static/page/course/common/course_common.js");
    require("/static/page/course/common/course_collection.js");
    var c = require("store"), v = !1;
    if (isLogin || $(".js-textarea-unlogin").click(function () {
            require.async("login_sns", function (a) {
                a.init()
            })
        }), 0 == $(".empty-holder").length) {
        var h = $(".mod-post").find(".post-row"), j = [];
        $(h).each(function (a) {
            j.push($(h[a]).attr("id"))
        });
        var g = j.join(",");
        $.ajax({
            url: "/course/ajaxusercommentsstatus",
            data: {ids: g},
            type: "GET",
            dataType: "json",
            success: function (a) {
                if (0 == a.result) {
                    var c = a.data;
                    "" != c && $(j).each(function (a) {
                        $(c).each(function (i) {
                            if (j[a] == c[i].comment_id) {
                                var v = $(h).eq(a).find(".js-pl-praise"), g = c[i].support_num;
                                v.attr("title", "取消赞").addClass("on"), v.find("span").addClass("on"), v.find("em").text(g)
                            }
                        })
                    })
                }
            }
        })
    }
    0 != $("#js-pub-container").length && $.ajax({
        url: "/u/card", type: "get", dataType: "json", success: function (a) {
            if (0 == a.result) {
                var c = a.data;
                $("#js-pub-container").find(".user-head img").attr({
                    src: c.img,
                    alt: c.nickname
                }), $("#js-pub-container").find(".user-head").attr({href: "/u/" + c.uid})
            }
        }
    }), $("#js-pl-input-fake").on({
        focusin: function () {
            $(this).addClass("ipt-fake-focus"), $(".pub-editor-wrap").next(".errortip").hide()
        }, focusout: function () {
            $(this).removeClass("ipt-fake-focus")
        }, keyup: function () {
            var a = $.trim($("#js-pl-textarea").val()).length;
            a > 300 ? $(this).addClass("ipt-fake-error").find("#js-pl-limit").addClass("limit-overflow") : $(this).removeClass("ipt-fake-error").find("#js-pl-limit").removeClass("limit-overflow"), $("#js-pl-limit").text(a)
        }
    });
    var C = function (c) {
        $.ajax({
            url: "/course/docomment", type: "post", dataType: "json", data: c, success: function (h) {
                if (-103008 == h.result) {
                    var j = $("#maybe-wenda");
                    j.show().addClass("show")
                } else if (0 === h.result) {
                    $("#js-pl-textarea").val("").blur();
                    var g, C = h.data, b = c.content, y = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;",
                        "`": "&#x60;"
                    };
                    g = "(?:";
                    for (var _ in y)g += _ + "|";
                    g = g.slice(0, -1), g += ")", g = RegExp(g, "g"), b = b.replace(g, function (m) {
                        return y[m] || m
                    }).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>$2");
                    var k = "<li>";
                    k += '<div class="notelist_headpic"><a href="/u/' + OP_CONFIG.userInfo.uid + '/courses" target="_blank"><img src="' + C.portrait + '" width="40" height="40"/></a></div><div class="notelist_content"><div class="u_name"><a href="/space/index" target="_blank">' + C.nickname + "</a></div><p>" + b + '</p><div class="notelist-bottom clearfix"> <span  class="l timeago">时间：' + C.create_time + '</span><div class="notelist-actions"> <a title="赞" href="javascript:;" class="js-pl-praise list-praise"  data-id="' + C.id + '"><span class="icon icon_good "></span><em>0</em></a></div></div></div></li>';
                    var w = {
                        id: C.id,
                        txt: b,
                        time: C.create_time,
                        nickname: C.nickname,
                        upic: C.portrait,
                        uid: OP_CONFIG.userInfo.uid
                    }, I = $("#tpl_pl").html(), T = "";
                    T = a.tpl(I, w), $("#course_note .mod-post").length || ($("#course_note").append('<ul class="mod-post"></ul>'), $("#course_note .empty-holder").remove()), $("#course_note .mod-post").prepend(T), $("#js-pl-limit").text("0"), $(".js-verify-box").hide(), v = !1
                } else if (-1 == h.result) {
                    var G = $(".js-form:visible");
                    G.find(".js-verify-box").show().trigger("reset"), G.find(".errortip").text("请输入验证码！").show(), v = !0
                } else {
                    var G = $(".js-form:visible");
                    G.find(".js-verify-box:visible").trigger("reset"), G.find(".errortip").text(h.msg).show()
                }
            }, complete: function () {
                $("#js-pl-submit").removeClass("loading").val("发表评论")
            }
        })
    }, b = function (a) {
        var c, h = $("#js-pl-submit"), j = $("#js-user-mp"), g = $(".pub-editor-wrap").parent().find(".errortip"), b = $(".js-verify-box"), y = null, _ = {};
        if (!h.hasClass("loading")) {
            if (c = $.trim($("#js-pl-textarea").val()), c.length < 5)return void g.text("内容不能少于5个字符！").show();
            if (c.length > 300)return void g.text("内容不能大于300个字符！").show();
            if (g.hide(), j.length && +j.text() < 50)return g.text("您的经验值未满50，不能发表评论！").show(), !1;
            if (b.is(":visible")) {
                var k = b.find(".ipt").val();
                if (0 == k.length)return void alert("请输入验证码")
            }
            if (b.hasClass("vf-error"))return void b.trigger("reset");
            y = b.find(".ipt").val().trim(), v && (_.verify = y), h.addClass("loading").val("发布中...");
            var w = {content: c, cid: GC.course.id};
            $.extend(w, _), a && (w.checked = 1), C(w)
        }
    }, y = {
        praiseClick: function (a) {
            $praise = a.find("em"), $.ajax({
                url: "/course/commentsupport",
                data: {id: a.attr("data-id")},
                type: "GET",
                dataType: "json",
                success: function (c) {
                    if (0 == c.result) {
                        var v = parseInt($praise.text());
                        $praise.text(v + 1), a.addClass("on"), a.find("span").addClass("on praise-anim"), a.attr("title", "取消赞")
                    }
                }
            })
        }, praiseCancel: function (a) {
            $praise = a.find("em"), $.ajax({
                url: "/course/commentsupport?cancel",
                data: {id: a.attr("data-id")},
                type: "POST",
                dataType: "json",
                success: function (c) {
                    if (0 == c.result) {
                        var v = parseInt($praise.text());
                        $praise.text(v - 1), a.removeClass("on"), a.find("span").attr("class", "icon-thumb-revert"), a.attr("title", "赞")
                    }
                }
            })
        }
    };
    $("#js-pl-submit").click(function () {
        return isLogin ? void b(!1) : ($(".js-textarea-unlogin").trigger("click"), !1)
    }), $("#wenda-ok").on("click", function () {
        c.set("maybewenda_content", $.trim($("#js-pl-textarea").val())), location = "/qa/" + GC.course.id
    }), $("#wenda-no").on("click", function () {
        b(!0), $("#maybe-wenda").removeClass("show").slideUp("fast")
    }), $(document).on("click", ".js-pl-praise", function (e) {
        if (e.preventDefault(), !OP_CONFIG.userInfo)return void require.async("login_sns", function (a) {
            a.init()
        });
        var a = $(this);
        a.hasClass("on") ? y.praiseCancel(a) : y.praiseClick(a)
    })
});