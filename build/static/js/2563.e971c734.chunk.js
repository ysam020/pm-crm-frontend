"use strict";(self.webpackChunkpaymaster_crm=self.webpackChunkpaymaster_crm||[]).push([[2563],{4801:(t,e,r)=>{r.d(e,{A:()=>a});var o=r(3235),n=r(4414);const a=(0,o.A)((0,n.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack")},3212:(t,e,r)=>{r.d(e,{A:()=>a});var o=r(3235),n=r(4414);const a=(0,o.A)((0,n.jsx)("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu")},6387:(t,e,r)=>{r.d(e,{A:()=>a});var o=r(3235),n=r(4414);const a=(0,o.A)((0,n.jsx)("path",{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"}),"Notifications")},8060:(t,e,r)=>{r.d(e,{A:()=>y});var o=r(9950),n=r(2004),a=r(8465),i=r(9254),s=r(4265),c=r(8463),l=r(1676),p=r(1734),u=r(693),d=r(1763),h=r(423);function f(t){return(0,h.Ay)("MuiAppBar",t)}(0,d.A)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);var m=r(4414);const g=(t,e)=>t?`${t?.replace(")","")}, ${e})`:e,v=(0,i.Ay)(u.A,{name:"MuiAppBar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[`position${(0,l.A)(r.position)}`],e[`color${(0,l.A)(r.color)}`]]}})((0,s.A)((t=>{let{theme:e}=t;return{display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0,variants:[{props:{position:"fixed"},style:{position:"fixed",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}}},{props:{position:"absolute"},style:{position:"absolute",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0}},{props:{position:"sticky"},style:{position:"sticky",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0}},{props:{position:"static"},style:{position:"static"}},{props:{position:"relative"},style:{position:"relative"}},{props:{color:"inherit"},style:{"--AppBar-color":"inherit"}},{props:{color:"default"},style:{"--AppBar-background":e.vars?e.vars.palette.AppBar.defaultBg:e.palette.grey[100],"--AppBar-color":e.vars?e.vars.palette.text.primary:e.palette.getContrastText(e.palette.grey[100]),...e.applyStyles("dark",{"--AppBar-background":e.vars?e.vars.palette.AppBar.defaultBg:e.palette.grey[900],"--AppBar-color":e.vars?e.vars.palette.text.primary:e.palette.getContrastText(e.palette.grey[900])})}},...Object.entries(e.palette).filter((0,p.A)(["contrastText"])).map((t=>{let[r]=t;return{props:{color:r},style:{"--AppBar-background":(e.vars??e).palette[r].main,"--AppBar-color":(e.vars??e).palette[r].contrastText}}})),{props:t=>!0===t.enableColorOnDark&&!["inherit","transparent"].includes(t.color),style:{backgroundColor:"var(--AppBar-background)",color:"var(--AppBar-color)"}},{props:t=>!1===t.enableColorOnDark&&!["inherit","transparent"].includes(t.color),style:{backgroundColor:"var(--AppBar-background)",color:"var(--AppBar-color)",...e.applyStyles("dark",{backgroundColor:e.vars?g(e.vars.palette.AppBar.darkBg,"var(--AppBar-background)"):null,color:e.vars?g(e.vars.palette.AppBar.darkColor,"var(--AppBar-color)"):null})}},{props:{color:"transparent"},style:{"--AppBar-background":"transparent","--AppBar-color":"inherit",backgroundColor:"var(--AppBar-background)",color:"var(--AppBar-color)",...e.applyStyles("dark",{backgroundImage:"none"})}}]}}))),y=o.forwardRef((function(t,e){const r=(0,c.b)({props:t,name:"MuiAppBar"}),{className:o,color:i="primary",enableColorOnDark:s=!1,position:p="fixed",...u}=r,d={...r,color:i,position:p,enableColorOnDark:s},h=(t=>{const{color:e,position:r,classes:o}=t,n={root:["root",`color${(0,l.A)(e)}`,`position${(0,l.A)(r)}`]};return(0,a.A)(n,f,o)})(d);return(0,m.jsx)(v,{square:!0,component:"header",ownerState:d,elevation:4,className:(0,n.A)(h.root,o,"fixed"===p&&"mui-fixed"),ref:e,...u})}))},4489:(t,e,r)=>{r.d(e,{Ay:()=>h});var o=r(9950),n=r(4431),a=r(8463),i=r(4414);const s="function"===typeof(0,n.Dp)({}),c=(t,e)=>({WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box",WebkitTextSizeAdjust:"100%",...e&&!t.vars&&{colorScheme:t.palette.mode}}),l=t=>({color:(t.vars||t).palette.text.primary,...t.typography.body1,backgroundColor:(t.vars||t).palette.background.default,"@media print":{backgroundColor:(t.vars||t).palette.common.white}}),p=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r={};e&&t.colorSchemes&&"function"===typeof t.getColorSchemeSelector&&Object.entries(t.colorSchemes).forEach((e=>{let[o,n]=e;const a=t.getColorSchemeSelector(o);a.startsWith("@")?r[a]={":root":{colorScheme:n.palette?.mode}}:r[a.replace(/\s*&/,"")]={colorScheme:n.palette?.mode}}));let o={html:c(t,e),"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:t.typography.fontWeightBold},body:{margin:0,...l(t),"&::backdrop":{backgroundColor:(t.vars||t).palette.background.default}},...r};const n=t.components?.MuiCssBaseline?.styleOverrides;return n&&(o=[o,n]),o},u="mui-ecs",d=(0,n.Dp)(s?t=>{let{theme:e,enableColorScheme:r}=t;return p(e,r)}:t=>{let{theme:e}=t;return(t=>{const e=p(t,!1),r=Array.isArray(e)?e[0]:e;return!t.vars&&r&&(r.html[`:root:has(${u})`]={colorScheme:t.palette.mode}),t.colorSchemes&&Object.entries(t.colorSchemes).forEach((e=>{let[o,n]=e;const a=t.getColorSchemeSelector(o);a.startsWith("@")?r[a]={[`:root:not(:has(.${u}))`]:{colorScheme:n.palette?.mode}}:r[a.replace(/\s*&/,"")]={[`&:not(:has(.${u}))`]:{colorScheme:n.palette?.mode}}})),e})(e)});const h=function(t){const e=(0,a.b)({props:t,name:"MuiCssBaseline"}),{children:r,enableColorScheme:n=!1}=e;return(0,i.jsxs)(o.Fragment,{children:[s&&(0,i.jsx)(d,{enableColorScheme:n}),!s&&!n&&(0,i.jsx)("span",{className:u,style:{display:"none"}}),r]})}},9694:(t,e,r)=>{r.d(e,{Ay:()=>z,iB:()=>D,$b:()=>P});var o=r(9950),n=r(2004),a=r(8465),i=r(4730),s=r(9120),c=r(7279),l=r(2253),p=r(1209),u=r(1506),d=r(4857),h=r(576),f=r(827),m=r(4414);function g(t,e,r){var o;const n=function(t,e,r){const o=e.getBoundingClientRect(),n=r&&r.getBoundingClientRect(),a=(0,f.A)(e);let i;if(e.fakeTransform)i=e.fakeTransform;else{const t=a.getComputedStyle(e);i=t.getPropertyValue("-webkit-transform")||t.getPropertyValue("transform")}let s=0,c=0;if(i&&"none"!==i&&"string"===typeof i){const t=i.split("(")[1].split(")")[0].split(",");s=parseInt(t[4],10),c=parseInt(t[5],10)}return"left"===t?n?`translateX(${n.right+s-o.left}px)`:`translateX(${a.innerWidth+s-o.left}px)`:"right"===t?n?`translateX(-${o.right-n.left-s}px)`:`translateX(-${o.left+o.width-s}px)`:"up"===t?n?`translateY(${n.bottom+c-o.top}px)`:`translateY(${a.innerHeight+c-o.top}px)`:n?`translateY(-${o.top-n.top+o.height-c}px)`:`translateY(-${o.top+o.height-c}px)`}(t,e,"function"===typeof(o=r)?o():o);n&&(e.style.webkitTransform=n,e.style.transform=n)}const v=o.forwardRef((function(t,e){const r=(0,d.A)(),n={enter:r.transitions.easing.easeOut,exit:r.transitions.easing.sharp},a={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:v,container:y,direction:A="down",easing:b=n,in:x,onEnter:k,onEntered:w,onEntering:S,onExit:B,onExited:T,onExiting:C,style:E,timeout:M=a,TransitionComponent:$=c.Ay,...R}=t,P=o.useRef(null),D=(0,u.A)((0,l.A)(v),P,e),z=t=>e=>{t&&(void 0===e?t(P.current):t(P.current,e))},j=z(((t,e)=>{g(A,t,y),(0,h.q)(t),k&&k(t,e)})),I=z(((t,e)=>{const o=(0,h.c)({timeout:M,style:E,easing:b},{mode:"enter"});t.style.webkitTransition=r.transitions.create("-webkit-transform",{...o}),t.style.transition=r.transitions.create("transform",{...o}),t.style.webkitTransform="none",t.style.transform="none",S&&S(t,e)})),H=z(w),L=z(C),W=z((t=>{const e=(0,h.c)({timeout:M,style:E,easing:b},{mode:"exit"});t.style.webkitTransition=r.transitions.create("-webkit-transform",e),t.style.transition=r.transitions.create("transform",e),g(A,t,y),B&&B(t)})),Y=z((t=>{t.style.webkitTransition="",t.style.transition="",T&&T(t)})),X=o.useCallback((()=>{P.current&&g(A,P.current,y)}),[A,y]);return o.useEffect((()=>{if(x||"down"===A||"right"===A)return;const t=(0,p.A)((()=>{P.current&&g(A,P.current,y)})),e=(0,f.A)(P.current);return e.addEventListener("resize",t),()=>{t.clear(),e.removeEventListener("resize",t)}}),[A,x,y]),o.useEffect((()=>{x||X()}),[x,X]),(0,m.jsx)($,{nodeRef:P,onEnter:j,onEntered:H,onEntering:I,onExit:W,onExited:Y,onExiting:L,addEndListener:t=>{i&&i(P.current,t)},appear:s,in:x,timeout:M,...R,children:(t,e)=>{let{ownerState:r,...n}=e;return o.cloneElement(v,{ref:D,style:{visibility:"exited"!==t||x?void 0:"hidden",...E,...v.props.style},...n})}})}));var y=r(693),A=r(1676),b=r(9608),x=r(9254),k=r(4265),w=r(8463),S=r(1763),B=r(423);function T(t){return(0,B.Ay)("MuiDrawer",t)}(0,S.A)("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const C=(t,e)=>{const{ownerState:r}=t;return[e.root,("permanent"===r.variant||"persistent"===r.variant)&&e.docked,e.modal]},E=(0,x.Ay)(s.A,{name:"MuiDrawer",slot:"Root",overridesResolver:C})((0,k.A)((t=>{let{theme:e}=t;return{zIndex:(e.vars||e).zIndex.drawer}}))),M=(0,x.Ay)("div",{shouldForwardProp:b.A,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:C})({flex:"0 0 auto"}),$=(0,x.Ay)(y.A,{name:"MuiDrawer",slot:"Paper",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.paper,e[`paperAnchor${(0,A.A)(r.anchor)}`],"temporary"!==r.variant&&e[`paperAnchorDocked${(0,A.A)(r.anchor)}`]]}})((0,k.A)((t=>{let{theme:e}=t;return{overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(e.vars||e).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0,variants:[{props:{anchor:"left"},style:{left:0}},{props:{anchor:"top"},style:{top:0,left:0,right:0,height:"auto",maxHeight:"100%"}},{props:{anchor:"right"},style:{right:0}},{props:{anchor:"bottom"},style:{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"}},{props:t=>{let{ownerState:e}=t;return"left"===e.anchor&&"temporary"!==e.variant},style:{borderRight:`1px solid ${(e.vars||e).palette.divider}`}},{props:t=>{let{ownerState:e}=t;return"top"===e.anchor&&"temporary"!==e.variant},style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`}},{props:t=>{let{ownerState:e}=t;return"right"===e.anchor&&"temporary"!==e.variant},style:{borderLeft:`1px solid ${(e.vars||e).palette.divider}`}},{props:t=>{let{ownerState:e}=t;return"bottom"===e.anchor&&"temporary"!==e.variant},style:{borderTop:`1px solid ${(e.vars||e).palette.divider}`}}]}}))),R={left:"right",right:"left",top:"down",bottom:"up"};function P(t){return["left","right"].includes(t)}function D(t,e){let{direction:r}=t;return"rtl"===r&&P(e)?R[e]:e}const z=o.forwardRef((function(t,e){const r=(0,w.b)({props:t,name:"MuiDrawer"}),s=(0,d.A)(),c=(0,i.I)(),l={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{anchor:p="left",BackdropProps:u,children:h,className:f,elevation:g=16,hideBackdrop:y=!1,ModalProps:{BackdropProps:b,...x}={},onClose:k,open:S=!1,PaperProps:B={},SlideProps:C,TransitionComponent:P=v,transitionDuration:z=l,variant:j="temporary",...I}=r,H=o.useRef(!1);o.useEffect((()=>{H.current=!0}),[]);const L=D({direction:c?"rtl":"ltr"},p),W=p,Y={...r,anchor:W,elevation:g,open:S,variant:j,...I},X=(t=>{const{classes:e,anchor:r,variant:o}=t,n={root:["root"],docked:[("permanent"===o||"persistent"===o)&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${(0,A.A)(r)}`,"temporary"!==o&&`paperAnchorDocked${(0,A.A)(r)}`]};return(0,a.A)(n,T,e)})(Y),N=(0,m.jsx)($,{elevation:"temporary"===j?g:0,square:!0,...B,className:(0,n.A)(X.paper,B.className),ownerState:Y,children:h});if("permanent"===j)return(0,m.jsx)(M,{className:(0,n.A)(X.root,X.docked,f),ownerState:Y,ref:e,...I,children:N});const O=(0,m.jsx)(P,{in:S,direction:R[L],timeout:z,appear:H.current,...C,children:N});return"persistent"===j?(0,m.jsx)(M,{className:(0,n.A)(X.root,X.docked,f),ownerState:Y,ref:e,...I,children:O}):(0,m.jsx)(E,{BackdropProps:{...u,...b,transitionDuration:z},className:(0,n.A)(X.root,X.modal,f),open:S,ownerState:Y,onClose:k,hideBackdrop:y,ref:e,...I,...x,children:O})}))},685:(t,e,r)=>{r.d(e,{A:()=>$});var o=r(9950),n=r(7119),a=r(1399);const i=function(t){const{children:e,defer:r=!1,fallback:n=null}=t,[i,s]=o.useState(!1);return(0,a.A)((()=>{r||s(!0)}),[r]),o.useEffect((()=>{r&&s(!0)}),[r]),i?e:n};var s=r(9694),c=r(1506),l=r(7402),p=r(827),u=r(1976),d=r(9044),h=r(4857),f=r(8463),m=r(576),g=r(2004),v=r(9254),y=r(4265),A=r(9608),b=r(1676),x=r(4414);const k=(0,v.Ay)("div",{shouldForwardProp:A.A})((0,y.A)((t=>{let{theme:e}=t;return{position:"fixed",top:0,left:0,bottom:0,zIndex:e.zIndex.drawer-1,variants:[{props:{anchor:"left"},style:{right:"auto"}},{props:{anchor:"right"},style:{left:"auto",right:0}},{props:{anchor:"top"},style:{bottom:"auto",right:0}},{props:{anchor:"bottom"},style:{top:"auto",bottom:0,right:0}}]}}))),w=o.forwardRef((function(t,e){const{anchor:r,classes:o={},className:n,width:a,style:i,...c}=t,l=t;return(0,x.jsx)(k,{className:(0,g.A)("PrivateSwipeArea-root",o.root,o[`anchor${(0,b.A)(r)}`],n),ref:e,style:{[(0,s.$b)(r)?"width":"height"]:a,...i},ownerState:l,...c})}));let S=null;function B(t,e,r){return"right"===t?r.body.offsetWidth-e[0].pageX:e[0].pageX}function T(t,e,r){return"bottom"===t?r.innerHeight-e[0].clientY:e[0].clientY}function C(t,e){return t?e.clientWidth:e.clientHeight}function E(t,e,r,o){return Math.min(Math.max(r?e-t:o+e-t,0),o)}const M="undefined"!==typeof navigator&&/iPad|iPhone|iPod/.test(navigator.userAgent),$=o.forwardRef((function(t,e){const r=(0,f.b)({name:"MuiSwipeableDrawer",props:t}),a=(0,h.A)(),g={enter:a.transitions.duration.enteringScreen,exit:a.transitions.duration.leavingScreen},{anchor:v="left",disableBackdropTransition:y=!1,disableDiscovery:A=!1,disableSwipeToOpen:b=M,hideBackdrop:k,hysteresis:$=.52,allowSwipeInChildren:R=!1,minFlingVelocity:P=450,ModalProps:{BackdropProps:D,...z}={},onClose:j,onOpen:I,open:H=!1,PaperProps:L={},SwipeAreaProps:W,swipeAreaWidth:Y=20,transitionDuration:X=g,variant:N="temporary",...O}=r,[F,V]=o.useState(!1),G=o.useRef({isSwiping:null}),q=o.useRef(),_=o.useRef(),J=o.useRef(),K=(0,c.A)(L.ref,J),Q=o.useRef(!1),U=o.useRef();(0,d.A)((()=>{U.current=null}),[H]);const Z=o.useCallback((function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const{mode:r=null,changeTransition:o=!0}=e,n=(0,s.iB)(a,v),i=["right","bottom"].includes(n)?1:-1,c=(0,s.$b)(v),l=c?`translate(${i*t}px, 0)`:`translate(0, ${i*t}px)`,p=J.current.style;p.webkitTransform=l,p.transform=l;let u="";if(r&&(u=a.transitions.create("all",(0,m.c)({easing:void 0,style:void 0,timeout:X},{mode:r}))),o&&(p.webkitTransition=u,p.transition=u),!y&&!k){const e=_.current.style;e.opacity=1-t/C(c,J.current),o&&(e.webkitTransition=u,e.transition=u)}}),[v,y,k,a,X]),tt=(0,u.A)((t=>{if(!Q.current)return;if(S=null,Q.current=!1,n.flushSync((()=>{V(!1)})),!G.current.isSwiping)return void(G.current.isSwiping=null);G.current.isSwiping=null;const e=(0,s.iB)(a,v),r=(0,s.$b)(v);let o;o=r?B(e,t.changedTouches,(0,l.A)(t.currentTarget)):T(e,t.changedTouches,(0,p.A)(t.currentTarget));const i=r?G.current.startX:G.current.startY,c=C(r,J.current),u=E(o,i,H,c),d=u/c;Math.abs(G.current.velocity)>P&&(U.current=1e3*Math.abs((c-u)/G.current.velocity)),H?G.current.velocity>P||d>$?j():Z(0,{mode:"exit"}):G.current.velocity<-P||1-d>$?I():Z(C(r,J.current),{mode:"enter"})})),et=function(){if(!F){!(arguments.length>0&&void 0!==arguments[0]&&arguments[0])&&A&&R||n.flushSync((()=>{V(!0)}));const t=(0,s.$b)(v);!H&&J.current&&Z(C(t,J.current)+(A?15:-20),{changeTransition:!1}),G.current.velocity=0,G.current.lastTime=null,G.current.lastTranslate=null,G.current.paperHit=!1,Q.current=!0}},rt=(0,u.A)((t=>{if(!J.current||!Q.current)return;if(null!==S&&S!==G.current)return;et(!0);const e=(0,s.iB)(a,v),r=(0,s.$b)(v),o=B(e,t.touches,(0,l.A)(t.currentTarget)),n=T(e,t.touches,(0,p.A)(t.currentTarget));if(H&&J.current.contains(t.target)&&null===S){const e=function(t){let{domTreeShapes:e,start:r,current:o,anchor:n}=t;const a={x:"scrollLeft",y:"scrollTop"},i={x:"scrollWidth",y:"scrollHeight"},s={x:"clientWidth",y:"clientHeight"};return e.some((t=>{let e=o>=r;"top"!==n&&"left"!==n||(e=!e);const c="left"===n||"right"===n?"x":"y",l=Math.round(t[a[c]]),p=l>0,u=l+t[s[c]]<t[i[c]];return!!(e&&u||!e&&p)}))}({domTreeShapes:function(t,e){const r=[];for(;t&&t!==e.parentElement;){const o=(0,p.A)(e).getComputedStyle(t);"absolute"===o.getPropertyValue("position")||"hidden"===o.getPropertyValue("overflow-x")||(t.clientWidth>0&&t.scrollWidth>t.clientWidth||t.clientHeight>0&&t.scrollHeight>t.clientHeight)&&r.push(t),t=t.parentElement}return r}(t.target,J.current),start:r?G.current.startX:G.current.startY,current:r?o:n,anchor:v});if(e)return void(S=!0);S=G.current}if(null==G.current.isSwiping){const e=Math.abs(o-G.current.startX),a=Math.abs(n-G.current.startY),i=r?e>a&&e>3:a>e&&a>3;if(i&&t.cancelable&&t.preventDefault(),!0===i||(r?a>3:e>3)){if(G.current.isSwiping=i,!i)return void tt(t);G.current.startX=o,G.current.startY=n,A||H||(r?G.current.startX-=20:G.current.startY-=20)}}if(!G.current.isSwiping)return;const i=C(r,J.current);let c=r?G.current.startX:G.current.startY;H&&!G.current.paperHit&&(c=Math.min(c,i));const u=E(r?o:n,c,H,i);if(H)if(G.current.paperHit)0===u&&(G.current.startX=o,G.current.startY=n);else{if(!(r?o<i:n<i))return;G.current.paperHit=!0,G.current.startX=o,G.current.startY=n}null===G.current.lastTranslate&&(G.current.lastTranslate=u,G.current.lastTime=performance.now()+1);const d=(u-G.current.lastTranslate)/(performance.now()-G.current.lastTime)*1e3;G.current.velocity=.4*G.current.velocity+.6*d,G.current.lastTranslate=u,G.current.lastTime=performance.now(),t.cancelable&&t.preventDefault(),Z(u)})),ot=(0,u.A)((t=>{if(t.defaultPrevented)return;if(t.defaultMuiPrevented)return;if(H&&(k||!_.current.contains(t.target))&&!J.current.contains(t.target))return;const e=(0,s.iB)(a,v),r=(0,s.$b)(v),o=B(e,t.touches,(0,l.A)(t.currentTarget)),n=T(e,t.touches,(0,p.A)(t.currentTarget));if(!H){if(b||!(t.target===q.current||J.current?.contains(t.target)&&("function"===typeof R?R(t,q.current,J.current):R)))return;if(r){if(o>Y)return}else if(n>Y)return}t.defaultMuiPrevented=!0,S=null,G.current.startX=o,G.current.startY=n,et()}));return o.useEffect((()=>{if("temporary"===N){const t=(0,l.A)(J.current);return t.addEventListener("touchstart",ot),t.addEventListener("touchmove",rt,{passive:!H}),t.addEventListener("touchend",tt),()=>{t.removeEventListener("touchstart",ot),t.removeEventListener("touchmove",rt,{passive:!H}),t.removeEventListener("touchend",tt)}}}),[N,H,ot,rt,tt]),o.useEffect((()=>()=>{S===G.current&&(S=null)}),[]),o.useEffect((()=>{H||V(!1)}),[H]),(0,x.jsxs)(o.Fragment,{children:[(0,x.jsx)(s.Ay,{open:!("temporary"!==N||!F)||H,variant:N,ModalProps:{BackdropProps:{...D,ref:_},..."temporary"===N&&{keepMounted:!0},...z},hideBackdrop:k,PaperProps:{...L,style:{pointerEvents:"temporary"!==N||H||R?"":"none",...L.style},ref:K},anchor:v,transitionDuration:U.current||X,onClose:j,ref:e,...O}),!b&&"temporary"===N&&(0,x.jsx)(i,{children:(0,x.jsx)(w,{anchor:v,ref:q,width:Y,...W})})]})}))},3239:(t,e,r)=>{r.d(e,{A:()=>f});var o=r(9950),n=r(2004),a=r(8465),i=r(9254),s=r(4265),c=r(8463),l=r(1763),p=r(423);function u(t){return(0,p.Ay)("MuiToolbar",t)}(0,l.A)("MuiToolbar",["root","gutters","regular","dense"]);var d=r(4414);const h=(0,i.Ay)("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,!r.disableGutters&&e.gutters,e[r.variant]]}})((0,s.A)((t=>{let{theme:e}=t;return{position:"relative",display:"flex",alignItems:"center",variants:[{props:t=>{let{ownerState:e}=t;return!e.disableGutters},style:{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}},{props:{variant:"dense"},style:{minHeight:48}},{props:{variant:"regular"},style:e.mixins.toolbar}]}}))),f=o.forwardRef((function(t,e){const r=(0,c.b)({props:t,name:"MuiToolbar"}),{className:o,component:i="div",disableGutters:s=!1,variant:l="regular",...p}=r,f={...r,component:i,disableGutters:s,variant:l},m=(t=>{const{classes:e,disableGutters:r,variant:o}=t,n={root:["root",!r&&"gutters",o]};return(0,a.A)(n,u,e)})(f);return(0,d.jsx)(h,{as:i,className:(0,n.A)(m.root,o),ref:e,ownerState:f,...p})}))}}]);