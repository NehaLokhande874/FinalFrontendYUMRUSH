import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Landing() {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (userData) { navigate("/") }
    setTimeout(() => setVisible(true), 100)
  }, [userData])

  return (
    <div style={{ minHeight:"100vh", background:"#fff9f6", fontFamily:"Segoe UI,sans-serif", overflowX:"hidden" }}>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(255,249,246,0.95)", backdropFilter:"blur(10px)", borderBottom:"1px solid #ffe8e2", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 5%", height:64 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:28 }}>??</span>
          <span style={{ fontSize:22, fontWeight:800, color:"#ff4d2d" }}>YumRush</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => navigate("/signin")} style={{ padding:"8px 22px", borderRadius:25, border:"2px solid #ff4d2d", background:"transparent", color:"#ff4d2d", fontWeight:700, cursor:"pointer", fontSize:14 }}>Sign In</button>
          <button onClick={() => navigate("/signup")} style={{ padding:"8px 22px", borderRadius:25, border:"2px solid #ff4d2d", background:"#ff4d2d", color:"white", fontWeight:700, cursor:"pointer", fontSize:14 }}>Get Started</button>
        </div>
      </nav>

      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"100px 5% 60px", background:"radial-gradient(ellipse at top,#ffe8e2 0%,#fff9f6 60%)", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(30px)", transition:"all 0.8s ease" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff3f0", border:"1px solid #ffcbbf", borderRadius:25, padding:"6px 16px", marginBottom:28, fontSize:13, color:"#ff4d2d", fontWeight:600 }}>?? Now available in your city</div>
        <h1 style={{ fontSize:"clamp(40px,7vw,80px)", fontWeight:900, lineHeight:1.1, color:"#1a1a1a", marginBottom:20, letterSpacing:"-2px" }}>
          Hungry? <span style={{ color:"#ff4d2d" }}>We've got</span><br/>you covered ??
        </h1>
        <p style={{ fontSize:"clamp(16px,2.5vw,20px)", color:"#666", maxWidth:520, lineHeight:1.6, marginBottom:40 }}>Order from your favourite restaurants, track delivery live, and enjoy hot meals at your doorstep.</p>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap", justifyContent:"center" }}>
          <button onClick={() => navigate("/signup")} style={{ padding:"16px 40px", borderRadius:50, background:"#ff4d2d", color:"white", fontWeight:800, fontSize:17, border:"none", cursor:"pointer", boxShadow:"0 8px 30px rgba(255,77,45,0.35)" }}>Order Now ?</button>
          <button onClick={() => navigate("/signin")} style={{ padding:"16px 40px", borderRadius:50, background:"white", color:"#1a1a1a", fontWeight:700, fontSize:17, border:"2px solid #e5e5e5", cursor:"pointer" }}>Sign In</button>
        </div>
        <div style={{ marginTop:60, fontSize:48, display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", opacity:0.7 }}>
          {["??","??","??","??","??","??"].map((e,i) => <span key={i} style={{ display:"inline-block", animation:`float${i} ${2+i*0.3}s ease-in-out infinite alternate` }}>{e}</span>)}
        </div>
      </section>

      <section style={{ padding:"80px 5%", background:"white" }}>
        <h2 style={{ textAlign:"center", fontSize:"clamp(28px,4vw,42px)", fontWeight:800, color:"#1a1a1a", marginBottom:12, letterSpacing:"-1px" }}>Who is YumRush for?</h2>
        <p style={{ textAlign:"center", color:"#888", fontSize:16, marginBottom:50 }}>One platform, three roles</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24, maxWidth:1000, margin:"0 auto" }}>
          {[
            { icon:"???", title:"Customer", desc:"Order delicious food from restaurants near you", color:"#ff4d2d", bg:"#fff3f0" },
            { icon:"??", title:"Restaurant Owner", desc:"List your restaurant and reach more customers", color:"#f59e0b", bg:"#fffbeb" },
            { icon:"??", title:"Delivery Partner", desc:"Earn money by delivering orders in your city", color:"#10b981", bg:"#f0fdf4" }
          ].map((r,i) => (
            <div key={i} onClick={() => navigate("/signup")} style={{ background:r.bg, borderRadius:20, padding:"32px 28px", border:`2px solid ${r.color}22`, cursor:"pointer", textAlign:"center", transition:"all 0.25s" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>{r.icon}</div>
              <h3 style={{ fontSize:20, fontWeight:800, color:"#1a1a1a", marginBottom:10 }}>{r.title}</h3>
              <p style={{ color:"#666", fontSize:14, lineHeight:1.6, marginBottom:20 }}>{r.desc}</p>
              <span style={{ display:"inline-block", padding:"8px 20px", borderRadius:25, background:r.color, color:"white", fontWeight:700, fontSize:13 }}>Join as {r.title.split(" ")[0]} ?</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:"80px 5%", background:"linear-gradient(135deg,#ff4d2d,#ff8c42)", textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:"white", marginBottom:16, letterSpacing:"-1px" }}>Ready to get started?</h2>
        <p style={{ color:"rgba(255,255,255,0.85)", fontSize:18, marginBottom:36 }}>Join thousands of happy customers ordering every day</p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => navigate("/signup")} style={{ padding:"16px 44px", borderRadius:50, background:"white", color:"#ff4d2d", fontWeight:800, fontSize:17, border:"none", cursor:"pointer" }}>Create Free Account</button>
          <button onClick={() => navigate("/signin")} style={{ padding:"16px 44px", borderRadius:50, background:"transparent", color:"white", fontWeight:700, fontSize:17, border:"2px solid rgba(255,255,255,0.6)", cursor:"pointer" }}>Already have an account?</button>
        </div>
      </section>

      <footer style={{ background:"#1a1a1a", color:"rgba(255,255,255,0.5)", textAlign:"center", padding:"24px 5%", fontSize:13 }}>
        <span style={{ color:"#ff4d2d", fontWeight:700 }}>YumRush</span> © 2025 · Made with ?? for food lovers
      </footer>

      <style>{`@keyframes float0{from{transform:translateY(0)}to{transform:translateY(-12px)}} @keyframes float1{from{transform:translateY(0)}to{transform:translateY(-10px)}} @keyframes float2{from{transform:translateY(0)}to{transform:translateY(-14px)}} @keyframes float3{from{transform:translateY(0)}to{transform:translateY(-8px)}} @keyframes float4{from{transform:translateY(0)}to{transform:translateY(-12px)}} @keyframes float5{from{transform:translateY(0)}to{transform:translateY(-10px)}}`}</style>
    </div>
  )
}

export default Landing
