"use strict";(self.webpackChunkpaymaster_crm=self.webpackChunkpaymaster_crm||[]).push([[5163],{5163:(e,a,i)=>{i.r(a),i.d(a,{default:()=>p});var o=i(9950),s=i(3939),t=i(3557),n=i(6888),r=i(3632),l=i(9845),m=i(3785),c=i(8394),u=i(4414);function _(){const{setAlert:e}=(0,o.useContext)(l.C),a=(0,s.Wx)({initialValues:{overall_job_satisfaction:0,opportunity_to_utilize_skills:0,workload_and_stress_management:0,quality_of_communication:"",support_from_manager:"",appreciation_for_work:"",collaboration_within_the_team:"",overall_company_culture:"",suggestions:""},onSubmit:async(a,i)=>{let{resetForm:o}=i;try{const i=await m.A.post("/add-exit-feedback",a);e({open:!0,message:i.data.message,severity:"success"}),o()}catch(s){e({open:!0,message:"Network Error"===s.message?"Network Error, your details will be submitted when you are back online":s.response.data.message,severity:"error"})}}});return(0,u.jsxs)("form",{onSubmit:a.handleSubmit,children:[(0,u.jsx)(c.A,{container:!0,spacing:1,children:(0,u.jsxs)(c.A,{size:{xs:4,sm:4,md:4,lg:4},children:["Overall job satisfaction",(0,u.jsx)("br",{}),(0,u.jsx)(r.A,{name:"overall_job_satisfaction",value:a.values.overall_job_satisfaction,onChange:(e,i)=>{a.setFieldValue("overall_job_satisfaction",i)}})]})}),(0,u.jsx)("h5",{children:"Management & Team Environment"}),(0,u.jsxs)(c.A,{container:!0,spacing:1,children:[(0,u.jsx)(c.A,{size:4,children:(0,u.jsx)(n.A,{id:"quality_of_communication",name:"quality_of_communication",label:"Quality of communication",formik:a,useSpeech:!0})}),(0,u.jsx)(c.A,{size:4,children:(0,u.jsx)(n.A,{id:"support_from_manager",name:"support_from_manager",label:"Support from manager",formik:a,useSpeech:!0})}),(0,u.jsx)(c.A,{size:4,children:(0,u.jsx)(n.A,{id:"appreciation_for_work",name:"appreciation_for_work",label:"Appreciation for work",formik:a,useSpeech:!0})})]}),(0,u.jsxs)(c.A,{container:!0,spacing:1,children:[(0,u.jsx)(c.A,{size:4,children:(0,u.jsx)(n.A,{id:"collaboration_within_the_team",name:"collaboration_within_the_team",label:"Collaboration within the team",formik:a,useSpeech:!0})}),(0,u.jsx)(c.A,{size:4,children:(0,u.jsx)(n.A,{id:"overall_company_culture",name:"overall_company_culture",label:"Overall company culture",formik:a,useSpeech:!0})})]}),(0,u.jsx)(n.A,{id:"suggestions",name:"suggestions",label:"Suggestions for improvement",formik:a,multiline:!0,rows:2,useSpeech:!0}),(0,u.jsx)(t.A,{name:"Submit",isSubmitting:a.isSubmitting})]})}const p=o.memo(_)}}]);