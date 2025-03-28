"use strict";(self.webpackChunkpaymaster_crm=self.webpackChunkpaymaster_crm||[]).push([[1609],{5158:(e,t,n)=>{n.d(t,{A:()=>h});var r=n(9950),o=n(2004),s=n(8465),i=n(9254),a=n(8463),c=n(4763),l=n(7191),d=n(1763),u=n(423);function p(e){return(0,u.Ay)("MuiBackdrop",e)}(0,d.A)("MuiBackdrop",["root","invisible"]);var f=n(4414);const m=(0,i.Ay)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),h=r.forwardRef((function(e,t){const n=(0,a.b)({props:e,name:"MuiBackdrop"}),{children:r,className:i,component:d="div",invisible:u=!1,open:h,components:A={},componentsProps:y={},slotProps:b={},slots:v={},TransitionComponent:g,transitionDuration:E,...x}=n,R={...n,component:d,invisible:u},k=(e=>{const{classes:t,invisible:n}=e,r={root:["root",n&&"invisible"]};return(0,s.A)(r,p,t)})(R),T={slots:{transition:g,root:A.Root,...v},slotProps:{...y,...b}},[w,P]=(0,c.A)("root",{elementType:m,externalForwardedProps:T,className:(0,o.A)(k.root,i),ownerState:R}),[C,I]=(0,c.A)("transition",{elementType:l.A,externalForwardedProps:T,ownerState:R});return(0,f.jsx)(C,{in:h,timeout:E,...x,...I,children:(0,f.jsx)(w,{"aria-hidden":!0,...P,classes:k,ref:t,children:r})})}))},32:(e,t,n)=>{n.d(t,{A:()=>A});var r=n(9950),o=n(2004),s=n(2199),i=n(505),a=n(237),c=n(5619),l=n(4414);var d=n(4501),u=n(5095),p=n(7550);const f=(0,n(1763).A)("MuiBox",["root"]),m=(0,u.A)(),h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:n,defaultClassName:d="MuiBox-root",generateClassName:u}=e,p=(0,s.Ay)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(i.A);return r.forwardRef((function(e,r){const s=(0,c.A)(n),{className:i,component:f="div",...m}=(0,a.A)(e);return(0,l.jsx)(p,{as:f,ref:r,className:(0,o.A)(i,u?u(d):d),theme:t&&s[t]||s,...m})}))}({themeId:p.A,defaultTheme:m,defaultClassName:f.root,generateClassName:d.A.generate}),A=h},7191:(e,t,n)=>{n.d(t,{A:()=>u});var r=n(9950),o=n(7279),s=n(2253),i=n(4857),a=n(576),c=n(1506),l=n(4414);const d={entering:{opacity:1},entered:{opacity:1}},u=r.forwardRef((function(e,t){const n=(0,i.A)(),u={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:p,appear:f=!0,children:m,easing:h,in:A,onEnter:y,onEntered:b,onEntering:v,onExit:g,onExited:E,onExiting:x,style:R,timeout:k=u,TransitionComponent:T=o.Ay,...w}=e,P=r.useRef(null),C=(0,c.A)(P,(0,s.A)(m),t),I=e=>t=>{if(e){const n=P.current;void 0===t?e(n):e(n,t)}},S=I(v),N=I(((e,t)=>{(0,a.q)(e);const r=(0,a.c)({style:R,timeout:k,easing:h},{mode:"enter"});e.style.webkitTransition=n.transitions.create("opacity",r),e.style.transition=n.transitions.create("opacity",r),y&&y(e,t)})),M=I(b),F=I(x),L=I((e=>{const t=(0,a.c)({style:R,timeout:k,easing:h},{mode:"exit"});e.style.webkitTransition=n.transitions.create("opacity",t),e.style.transition=n.transitions.create("opacity",t),g&&g(e)})),B=I(E);return(0,l.jsx)(T,{appear:f,in:A,nodeRef:P,onEnter:N,onEntered:M,onEntering:S,onExit:L,onExited:B,onExiting:F,addEndListener:e=>{p&&p(P.current,e)},timeout:k,...w,children:(e,t)=>{let{ownerState:n,...o}=t;return r.cloneElement(m,{style:{opacity:0,visibility:"exited"!==e||A?void 0:"hidden",...d[e],...R,...m.props.style},ref:C,...o})}})}))},9120:(e,t,n)=>{n.d(t,{A:()=>B});var r=n(9950),o=n(2004),s=n(8465),i=n(8370),a=n(6039),c=n(9254),l=n(4265),d=n(8463),u=n(5158),p=n(5393),f=n(6907),m=n(2529),h=n(5511),A=n(4701),y=n(8635),b=n(9259);function v(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function g(e){return parseInt((0,y.A)(e).getComputedStyle(e).paddingRight,10)||0}function E(e,t,n,r,o){const s=[t,n,...r];[].forEach.call(e.children,(e=>{const t=!s.includes(e),n=!function(e){const t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),n="INPUT"===e.tagName&&"hidden"===e.getAttribute("type");return t||n}(e);t&&n&&v(e,o)}))}function x(e,t){let n=-1;return e.some(((e,r)=>!!t(e)&&(n=r,!0))),n}function R(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(function(e){const t=(0,f.A)(e);return t.body===e?(0,y.A)(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}(r)){const e=(0,b.A)((0,y.A)(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${g(r)+e}px`;const t=(0,f.A)(r).querySelectorAll(".mui-fixed");[].forEach.call(t,(t=>{n.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${g(t)+e}px`}))}let e;if(r.parentNode instanceof DocumentFragment)e=(0,f.A)(r).body;else{const t=r.parentElement,n=(0,y.A)(r);e="HTML"===t?.nodeName&&"scroll"===n.getComputedStyle(t).overflowY?t:r}n.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{n.forEach((e=>{let{value:t,el:n,property:r}=e;t?n.style.setProperty(r,t):n.style.removeProperty(r)}))}}const k=()=>{},T=new class{constructor(){this.modals=[],this.containers=[]}add(e,t){let n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&v(e.modalRef,!1);const r=function(e){const t=[];return[].forEach.call(e.children,(e=>{"true"===e.getAttribute("aria-hidden")&&t.push(e)})),t}(t);E(t,e.mount,e.modalRef,r,!0);const o=x(this.containers,(e=>e.container===t));return-1!==o?(this.containers[o].modals.push(e),n):(this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:r}),n)}mount(e,t){const n=x(this.containers,(t=>t.modals.includes(e))),r=this.containers[n];r.restore||(r.restore=R(r,t))}remove(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const n=this.modals.indexOf(e);if(-1===n)return n;const r=x(this.containers,(t=>t.modals.includes(e))),o=this.containers[r];if(o.modals.splice(o.modals.indexOf(e),1),this.modals.splice(n,1),0===o.modals.length)o.restore&&o.restore(),e.modalRef&&v(e.modalRef,t),E(o.container,e.mount,e.modalRef,o.hiddenSiblings,!1),this.containers.splice(r,1);else{const e=o.modals[o.modals.length-1];e.modalRef&&v(e.modalRef,!1)}return n}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}};const w=function(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:o=!1,closeAfterTransition:s=!1,onTransitionEnter:i,onTransitionExited:a,children:c,onClose:l,open:d,rootRef:u}=e,y=r.useRef({}),b=r.useRef(null),g=r.useRef(null),E=(0,p.A)(g,u),[x,R]=r.useState(!d),w=function(e){return!!e&&e.props.hasOwnProperty("in")}(c);let P=!0;"false"!==e["aria-hidden"]&&!1!==e["aria-hidden"]||(P=!1);const C=()=>(y.current.modalRef=g.current,y.current.mount=b.current,y.current),I=()=>{T.mount(C(),{disableScrollLock:o}),g.current&&(g.current.scrollTop=0)},S=(0,m.A)((()=>{const e=function(e){return"function"===typeof e?e():e}(t)||(0,f.A)(b.current).body;T.add(C(),e),g.current&&I()})),N=()=>T.isTopModal(C()),M=(0,m.A)((e=>{b.current=e,e&&(d&&N()?I():g.current&&v(g.current,P))})),F=r.useCallback((()=>{T.remove(C(),P)}),[P]);r.useEffect((()=>()=>{F()}),[F]),r.useEffect((()=>{d?S():w&&s||F()}),[d,F,w,s,S]);const L=e=>t=>{e.onKeyDown?.(t),"Escape"===t.key&&229!==t.which&&N()&&(n||(t.stopPropagation(),l&&l(t,"escapeKeyDown")))},B=e=>t=>{e.onClick?.(t),t.target===t.currentTarget&&l&&l(t,"backdropClick")};return{getRootProps:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=(0,A.A)(e);delete n.onTransitionEnter,delete n.onTransitionExited;const r={...n,...t};return{role:"presentation",...r,onKeyDown:L(r),ref:E}},getBackdropProps:function(){const e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{"aria-hidden":!0,...e,onClick:B(e),open:d}},getTransitionProps:()=>({onEnter:(0,h.A)((()=>{R(!1),i&&i()}),c?.props.onEnter??k),onExited:(0,h.A)((()=>{R(!0),a&&a(),s&&F()}),c?.props.onExited??k)}),rootRef:E,portalRef:M,isTopModal:N,exited:x,hasTransition:w}};var P=n(1763),C=n(423);function I(e){return(0,C.Ay)("MuiModal",e)}(0,P.A)("MuiModal",["root","hidden","backdrop"]);var S=n(4763),N=n(1506),M=n(4414);const F=(0,c.Ay)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})((0,l.A)((e=>{let{theme:t}=e;return{position:"fixed",zIndex:(t.vars||t).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:e=>{let{ownerState:t}=e;return!t.open&&t.exited},style:{visibility:"hidden"}}]}}))),L=(0,c.Ay)(u.A,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),B=r.forwardRef((function(e,t){const n=(0,d.b)({name:"MuiModal",props:e}),{BackdropComponent:c=L,BackdropProps:l,classes:u,className:p,closeAfterTransition:f=!1,children:m,container:h,component:A,components:y={},componentsProps:b={},disableAutoFocus:v=!1,disableEnforceFocus:g=!1,disableEscapeKeyDown:E=!1,disablePortal:x=!1,disableRestoreFocus:R=!1,disableScrollLock:k=!1,hideBackdrop:T=!1,keepMounted:P=!1,onBackdropClick:C,onClose:B,onTransitionEnter:O,onTransitionExited:D,open:j,slotProps:K={},slots:U={},theme:q,...W}=n,$={...n,closeAfterTransition:f,disableAutoFocus:v,disableEnforceFocus:g,disableEscapeKeyDown:E,disablePortal:x,disableRestoreFocus:R,disableScrollLock:k,hideBackdrop:T,keepMounted:P},{getRootProps:H,getBackdropProps:V,getTransitionProps:Y,portalRef:z,isTopModal:_,exited:G,hasTransition:Q}=w({...$,rootRef:t}),X={...$,exited:G},J=(e=>{const{open:t,exited:n,classes:r}=e,o={root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]};return(0,s.A)(o,I,r)})(X),Z={};if(void 0===m.props.tabIndex&&(Z.tabIndex="-1"),Q){const{onEnter:e,onExited:t}=Y();Z.onEnter=e,Z.onExited=t}const ee={...W,slots:{root:y.Root,backdrop:y.Backdrop,...U},slotProps:{...b,...K}},[te,ne]=(0,S.A)("root",{elementType:F,externalForwardedProps:ee,getSlotProps:H,additionalProps:{ref:t,as:A},ownerState:X,className:(0,o.A)(p,J?.root,!X.open&&X.exited&&J?.hidden)}),[re,oe]=(0,S.A)("backdrop",{elementType:c,externalForwardedProps:ee,additionalProps:l,getSlotProps:e=>V({...e,onClick:t=>{C&&C(t),e?.onClick&&e.onClick(t)}}),className:(0,o.A)(l?.className,J?.backdrop),ownerState:X}),se=(0,N.A)(l?.ref,oe.ref);return P||j||Q&&!G?(0,M.jsx)(a.A,{ref:z,container:h,disablePortal:x,children:(0,M.jsxs)(te,{...ne,children:[!T&&c?(0,M.jsx)(re,{...oe,ref:se}):null,(0,M.jsx)(i.A,{disableEnforceFocus:g,disableAutoFocus:v,disableRestoreFocus:R,isEnabled:_,open:j,children:r.cloneElement(m,Z)})]})}):null}))},6039:(e,t,n)=>{n.d(t,{A:()=>l});var r=n(9950),o=n(7119),s=n(5393),i=n(2253),a=n(1399),c=n(5587);const l=r.forwardRef((function(e,t){const{children:n,container:l,disablePortal:d=!1}=e,[u,p]=r.useState(null),f=(0,s.A)(r.isValidElement(n)?(0,i.A)(n):null,t);if((0,a.A)((()=>{d||p(function(e){return"function"===typeof e?e():e}(l)||document.body)}),[l,d]),(0,a.A)((()=>{if(u&&!d)return(0,c.A)(t,u),()=>{(0,c.A)(t,null)}}),[t,u,d]),d){if(r.isValidElement(n)){const e={ref:f};return r.cloneElement(n,e)}return n}return u?o.createPortal(n,u):u}))},8370:(e,t,n)=>{n.d(t,{A:()=>u});var r=n(9950),o=n(5393),s=n(2253),i=n(6907),a=n(4414);const c=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function l(e){const t=[],n=[];return Array.from(e.querySelectorAll(c)).forEach(((e,r)=>{const o=function(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}(e);-1!==o&&function(e){return!(e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type)return!1;if(!e.name)return!1;const t=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}(e))}(e)&&(0===o?t.push(e):n.push({documentOrder:r,tabIndex:o,node:e}))})),n.sort(((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex)).map((e=>e.node)).concat(t)}function d(){return!0}const u=function(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:c=!1,disableRestoreFocus:u=!1,getTabbable:p=l,isEnabled:f=d,open:m}=e,h=r.useRef(!1),A=r.useRef(null),y=r.useRef(null),b=r.useRef(null),v=r.useRef(null),g=r.useRef(!1),E=r.useRef(null),x=(0,o.A)((0,s.A)(t),E),R=r.useRef(null);r.useEffect((()=>{m&&E.current&&(g.current=!n)}),[n,m]),r.useEffect((()=>{if(!m||!E.current)return;const e=(0,i.A)(E.current);return E.current.contains(e.activeElement)||(E.current.hasAttribute("tabIndex")||E.current.setAttribute("tabIndex","-1"),g.current&&E.current.focus()),()=>{u||(b.current&&b.current.focus&&(h.current=!0,b.current.focus()),b.current=null)}}),[m]),r.useEffect((()=>{if(!m||!E.current)return;const e=(0,i.A)(E.current),t=t=>{R.current=t,!c&&f()&&"Tab"===t.key&&e.activeElement===E.current&&t.shiftKey&&(h.current=!0,y.current&&y.current.focus())},n=()=>{const t=E.current;if(null===t)return;if(!e.hasFocus()||!f()||h.current)return void(h.current=!1);if(t.contains(e.activeElement))return;if(c&&e.activeElement!==A.current&&e.activeElement!==y.current)return;if(e.activeElement!==v.current)v.current=null;else if(null!==v.current)return;if(!g.current)return;let n=[];if(e.activeElement!==A.current&&e.activeElement!==y.current||(n=p(E.current)),n.length>0){const e=Boolean(R.current?.shiftKey&&"Tab"===R.current?.key),t=n[0],r=n[n.length-1];"string"!==typeof t&&"string"!==typeof r&&(e?r.focus():t.focus())}else t.focus()};e.addEventListener("focusin",n),e.addEventListener("keydown",t,!0);const r=setInterval((()=>{e.activeElement&&"BODY"===e.activeElement.tagName&&n()}),50);return()=>{clearInterval(r),e.removeEventListener("focusin",n),e.removeEventListener("keydown",t,!0)}}),[n,c,u,f,m,p]);const k=e=>{null===b.current&&(b.current=e.relatedTarget),g.current=!0};return(0,a.jsxs)(r.Fragment,{children:[(0,a.jsx)("div",{tabIndex:m?0:-1,onFocus:k,ref:A,"data-testid":"sentinelStart"}),r.cloneElement(t,{ref:x,onFocus:e=>{null===b.current&&(b.current=e.relatedTarget),g.current=!0,v.current=e.target;const n=t.props.onFocus;n&&n(e)}}),(0,a.jsx)("div",{tabIndex:m?0:-1,onFocus:k,ref:y,"data-testid":"sentinelEnd"})]})}},576:(e,t,n)=>{n.d(t,{c:()=>o,q:()=>r});const r=e=>e.scrollTop;function o(e,t){const{timeout:n,easing:r,style:o={}}=e;return{duration:o.transitionDuration??("number"===typeof n?n:n[t.mode]||0),easing:o.transitionTimingFunction??("object"===typeof r?r[t.mode]:r),delay:o.transitionDelay}}},237:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(7483),o=n(7356);const s=e=>{const t={systemProps:{},otherProps:{}},n=e?.theme?.unstable_sxConfig??o.A;return Object.keys(e).forEach((r=>{n[r]?t.systemProps[r]=e[r]:t.otherProps[r]=e[r]})),t};function i(e){const{sx:t,...n}=e,{systemProps:o,otherProps:i}=s(n);let a;return a=Array.isArray(t)?[o,...t]:"function"===typeof t?function(){const e=t(...arguments);return(0,r.Q)(e)?{...o,...e}:o}:{...o,...t},{...i,sx:a}}},5511:(e,t,n)=>{function r(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(((e,t)=>null==t?e:function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];e.apply(this,r),t.apply(this,r)}),(()=>{}))}n.d(t,{A:()=>r})},2253:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(9950);function o(e){return parseInt(r.version,10)>=19?e?.props?.ref||null:e?.ref||null}},9259:(e,t,n)=>{function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;const t=e.document.documentElement.clientWidth;return e.innerWidth-t}n.d(t,{A:()=>r})},6907:(e,t,n)=>{function r(e){return e&&e.ownerDocument||document}n.d(t,{A:()=>r})},8635:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(6907);function o(e){return(0,r.A)(e).defaultView||window}}}]);