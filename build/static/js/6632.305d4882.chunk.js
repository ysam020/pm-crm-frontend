"use strict";(self.webpackChunkpaymaster_crm=self.webpackChunkpaymaster_crm||[]).push([[6632],{6632:(e,a,t)=>{t.r(a),t.d(a,{default:()=>u});t(9800);var n=t(9950),r=t(8476),s=t(4477),i=t(5333),l=t(3274),d=t(1637),c=t(5413),o=t(8727),h=t(4414);const u=e=>{const[a,u]=(0,n.useState)([]),m=(a,t)=>{var n;if(!t)return"";const r=`${e.year}-${String(e.month+1).padStart(2,"0")}-${String(a).padStart(2,"0")}`,s=e.attendances.find((e=>e.date===r));return(null===s||void 0===s||null===(n=s.status)||void 0===n?void 0:n.toLowerCase())||""};(0,n.useEffect)((()=>{(0,o.J)(e.year,e.month,e.currentDate,u)}),[e.month,e.year]);const y=(a,t)=>{if(!t)return"";const n=`${e.year}-${String(e.month+1).padStart(2,"0")}-${String(a).padStart(2,"0")}`,r=e.attendances.find((e=>e.date===n));var s;if(r)switch(null===r||void 0===r||null===(s=r.status)||void 0===s?void 0:s.toLowerCase()){case"present":return"Present";case"halfday":return"Half Day";case"leave":return"Leave";case"week off":return"Week Off";default:return"Unknown Status"}return""};return(0,h.jsxs)("div",{style:{marginTop:"20px"},children:[(0,h.jsxs)("header",{style:{alignItems:"center",justifyContent:"space-between",display:"flex"},children:[(0,h.jsx)("p",{className:"calendar-current-date",children:`${d.U[e.month]} ${e.year}`}),(0,h.jsxs)("div",{className:"calendar-navigation",children:[(0,h.jsx)(i.A,{"aria-label":"previous-month",onClick:async()=>{const{handleCalendarNavigation:a}=await t.e(8925).then(t.bind(t,8925));a(-1,e.month,e.year,e.setMonth,e.setYear)},children:(0,h.jsx)(s.A,{})}),(0,h.jsx)(i.A,{"aria-label":"next-month",onClick:async()=>{const{handleCalendarNavigation:a}=await t.e(8925).then(t.bind(t,8925));a(1,e.month,e.year,e.setMonth,e.setYear)},disabled:(()=>{const a=new Date;return e.year===a.getFullYear()&&e.month===a.getMonth()})(),children:(0,h.jsx)(r.A,{})})]})]}),(0,h.jsxs)("div",{className:"calendar-body",children:[(0,h.jsx)("ul",{className:"calendar-weekdays",children:c.m.map(((e,a)=>(0,h.jsx)("li",{children:e},a)))}),(0,h.jsx)("ul",{className:"calendar-dates",children:a.map(((e,a)=>(0,h.jsx)(l.A,{title:y(e.day,e.isCurrentMonth),arrow:!0,children:(0,h.jsx)("li",{className:`calendar-day ${e.isCurrentMonth?"":"inactive"} ${e.isToday?"active":""} ${m(e.day,e.isCurrentMonth)}`,children:e.day})},a)))})]})]})}}}]);