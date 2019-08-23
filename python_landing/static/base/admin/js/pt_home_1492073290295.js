EDU(31, function (e, t, i, n, s, o, a) {
    o._$$homePage = e._$klass();
    a = o._$$homePage._$extend(i);
    a.__init = function (e) {
        this.__super(e);
        if (/\&isNeedFollow\=true/.test(location.href)) location.search = location.search.replace(/\&isNeedFollow\=true/g, "");
        if (window.webUser && window.webUser.id == e.param.userId && location.href.indexOf("selfIntro") < 0) n._$checkEmailStatus({}, function (e) {
            if (3 != e.emailStatus) {
                t._$get("j-mailNotice").style.display = "block";
                new s({
                    data: {
                        email: e.email,
                        nickName: window.webUser.nickName,
                        emailStatus: e.emailStatus
                    }
                }).$inject("#j-mailNotice")
            } else t._$get("j-mailNotice").style.display = "none"
        })
    };
    a.__reset = function (e) {
        this.__super(e)
    };
    a.__destroy = function () {
        this.__super()
    };
    return o._$$homePage
}, 85, 14, 248, 203, 294);
EDU(33, function (e, t, i) {
    e._$allocate();
    window.dispatcher = i._$startup({
        rules: {rewrite: {404: "/home/course"}},
        modules: {
            "/": "common/commonutil.html",
            "/home": "home/index.html",
            "/home/mycert": "home/mycert.html",
            "/selfIntro": "home/selfIntro.html",
            "/home/course": "home/course.html",
            "/home/discuss": "home/discuss.html"
        }
    });
    if (window.isNeedFillMemberInfo) window.dispatcher._$redirect("/selfIntro", !0)
}, 31, 14, 32);


$(".hdbox h2").click(function(){
    $(this).addClass("cur").siblings().removeClass("cur");
    $(".cha_box").children(".cha_list").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
    // $(".cha_box .cha_list").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
})