function loadGMap(address,id,mzoom,content)
	{
	var latlng;
	geocoder=new google.maps.Geocoder();
	geocoder.geocode(
		{
		'address':address
	}
	,function(results,status)
		{
		if(status==google.maps.GeocoderStatus.OK)
			{
			latlng=results[0].geometry.location;
			var myOptions=
				{
				zoom:mzoom,center:latlng,mapTypeId:google.maps.MapTypeId.HYBRID
			};
			map=new google.maps.Map(document.getElementById(id),myOptions);
			if(typeof content!='undefined'&&content!='')
				{
				var overlay=new USGSOverlay(map,latlng,content)
			}
			else
				{
				var marker=new google.maps.Marker(
					{
					map:map,position:latlng,title:address
				}
				)
			}
		}
	}
	)
}

var protocol='http://';
function checkFlash()
	{
	var flashinstalled=false;
	if(navigator.plugins)
		{
		if(navigator.plugins["Shockwave Flash"])
			{
			flashinstalled=true
		}
		else if(navigator.plugins["Shockwave Flash 2.0"])
			{
			flashinstalled=true
		}
	}
	else if(navigator.mimeTypes)
		{
		var x=navigator.mimeTypes['application/x-shockwave-flash'];
		if(x&&x.enabledPlugin)
			{
			flashinstalled=true
		}
	}
	else
		{
		flashinstalled=true
	}
	if(!flashinstalled)
		{
		var flashObj=null;
		try
			{
			flashObj=new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
		}
		catch(ex)
			{
			return false
		}
		if(flashObj!=null)
			{
			flashinstalled=true
		}
	}
	return flashinstalled
}
jQuery('.tooltip').live('mouseover',function()
	{
	jQuery('span',this).css(
		{
		opacity:0.8,display:"none"
	}
	).fadeIn(400)
}
).live('mousemove',function(kmouse)
	{
	jQuery('span',this).css(
		{
		left:kmouse.pageX+15,top:kmouse.pageY+15
	}
	)
}
).live('mouseout',function()
	{
	jQuery('span',this).fadeOut(400)
}
);

function loadYouTube()
	{
	if(checkFlash())jQuery('.youtube').each(function()
		{
		if(jQuery('img',this).height()>1)
			{
			var height=jQuery('img',this).height()
		}
		else
			{
			var height=jQuery('img',this).width()/16*9
		}
		jQuery(this).parent().html('<object width="'+jQuery('img',this).width()+'" height="'+height+'"><param name="movie" value="'+protocol+'www.youtube.com/v/'+jQuery(this).attr('alt')+'?version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="'+protocol+'www.youtube.com/v/'+jQuery(this).attr('alt')+'?version=3" type="application/x-shockwave-flash" width="'+jQuery('img',this).width()+'" height="'+height+'" allowscriptaccess="always" allowfullscreen="true"></embed></object>')
	}
	)
}
function loadVimeo()
	{
	if(checkFlash())jQuery('.vimeo').each(function()
		{
		if(jQuery('img',this).height()>0)
			{
			var height=jQuery('img',this).height()
		}
		else
			{
			var height=jQuery('img',this).width()/16*9
		}
		jQuery(this).parent().html('<iframe src="'+protocol+'player.vimeo.com/video/'+jQuery(this).attr('alt')+'" width="'+jQuery('img',this).width()+'" height="'+height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
	}
	)
}

USGSOverlay.prototype=new google.maps.OverlayView();
function USGSOverlay(map,center,content)
	{
	this.center_=center;
	this.map_=map;
	this.content_=content;
	this.div_=null;
	this.setMap(map)
};
USGSOverlay.prototype.onAdd=function()
	{
	var div=document.createElement('div');
	div.innerHTML="<div class='smt_pointer'></div>"+this.content_;
	this.div_=div;
	var panes=this.getPanes();
	panes.overlayImage.appendChild(div)
};
USGSOverlay.prototype.draw=function()
	{
	var overlayProjection=this.getProjection();
	var sw=overlayProjection.fromLatLngToDivPixel(this.center_);
	var div=this.div_;
	div.className='smt-gmap-marker';
	div.style.left=sw.x+'px';
	div.style.top=(sw.y-div.clientHeight)+'px'
};
USGSOverlay.prototype.onRemove=function()
	{
	this.div_.parentNode.removeChild(this.div_);
	this.div_=null
};

(function(d) {
    var k = d.scrollTo = function(a, i, e) {
        d(window).scrollTo(a, i, e)
    };
    k.defaults = {axis: 'xy', duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1};
    k.window = function(a) {
        return d(window)._scrollable()
    };
    d.fn._scrollable = function() {
        return this.map(function() {
            var a = this, i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!i)
                return a;
            var e = (a.contentWindow || a).document || a.ownerDocument || a;
            return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement
        })
    };
    d.fn.scrollTo = function(n, j, b) {
        if (typeof j == 'object') {
            b = j;
            j = 0
        }
        if (typeof b == 'function')
            b = {onAfter: b};
        if (n == 'max')
            n = 9e9;
        b = d.extend({}, k.defaults, b);
        j = j || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue)
            j /= 2;
        b.offset = p(b.offset);
        b.over = p(b.over);
        return this._scrollable().each(function() {
            var q = this, r = d(q), f = n, s, g = {}, u = r.is('html,body');
            switch (typeof f) {
                case'number':
                case'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                        f = p(f);
                        break
                    }
                    f = d(f, this);
                case'object':
                    if (f.is || f.style)
                        s = (f = d(f)).offset()
            }
            d.each(b.axis.split(''), function(a, i) {
                var e = i == 'x' ? 'Left' : 'Top', h = e.toLowerCase(), c = 'scroll' + e, l = q[c], m = k.max(q, i);
                if (s) {
                    g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                    if (b.margin) {
                        g[c] -= parseInt(f.css('margin' + e)) || 0;
                        g[c] -= parseInt(f.css('border' + e + 'Width')) || 0
                    }
                    g[c] += b.offset[h] || 0;
                    if (b.over[h])
                        g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h]
                } else {
                    var o = f[h];
                    g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o
                }
                if (/^\d+$/.test(g[c]))
                    g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                if (!a && b.queue) {
                    if (l != g[c])
                        t(b.onAfterFirst);
                    delete g[c]
                }
            });
            t(b.onAfter);
            function t(a) {
                r.animate(g, j, b.easing, a && function() {
                    a.call(this, n, b)
                })
            }}
        ).end()
    };
    k.max = function(a, i) {
        var e = i == 'x' ? 'Width' : 'Height', h = 'scroll' + e;
        if (!d(a).is('html,body'))
            return a[h] - d(a)[e.toLowerCase()]();
        var c = 'client' + e, l = a.ownerDocument.documentElement, m = a.ownerDocument.body;
        return Math.max(l[h], m[h]) - Math.min(l[c], m[c])
    };
    function p(a) {
        return typeof a == 'object' ? a : {top: a, left: a}
    }}
)(jQuery);
