<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html, body {
        height: 100vh;
        overflow: hidden;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    /* Background électrique avec cyan dominant */
    .electric-bg {
        background: 
            radial-gradient(ellipse at top left, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(34, 211, 238, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(8, 145, 178, 0.5) 0%, transparent 60%),
            linear-gradient(135deg, #020617 0%, #0c1935 25%, #164e63 50%, #083344 75%, #020617 100%);
        position: relative;
        animation: bg-pulse 8s ease-in-out infinite;
    }
    
    @keyframes bg-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.1); }
    }
    
    /* Grille cyber avec lueur cyan */
    .cyber-grid {
        position: absolute;
        inset: 0;
        background-image: 
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: grid-glow 4s ease-in-out infinite alternate;
        z-index: 1;
    }
    
    @keyframes grid-glow {
        0% { opacity: 0.3; }
        100% { opacity: 0.7; }
    }
    
    /* Lignes d'énergie qui traversent l'écran */
    .energy-lines {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 2;
    }
    
    .energy-line {
        position: absolute;
        height: 2px;
        background: linear-gradient(90deg, transparent, #22d3ee, transparent);
        animation: energy-flow 3s linear infinite;
        box-shadow: 0 0 10px #22d3ee;
    }
    
    .energy-line:nth-child(1) {
        top: 20%;
        width: 300px;
        animation-delay: 0s;
    }
    
    .energy-line:nth-child(2) {
        top: 60%;
        width: 400px;
        animation-delay: 1s;
    }
    
    .energy-line:nth-child(3) {
        top: 80%;
        width: 250px;
        animation-delay: 2s;
    }
    
    @keyframes energy-flow {
        0% { left: -100%; opacity: 0; }
        50% { opacity: 1; }
        100% { left: 100%; opacity: 0; }
    }
    
    /* Logo sphere futuriste avec cyan intense */
    .logo-sphere {
        width: 140px;
        height: 140px;
        background: 
            radial-gradient(circle at 30% 30%, #22d3ee, #0891b2),
            linear-gradient(135deg, #06b6d4, #0e7490);
        border-radius: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        box-shadow: 
            0 0 60px rgba(34, 211, 238, 0.8),
            0 0 120px rgba(34, 211, 238, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        animation: logo-energy 3s ease-in-out infinite;
        border: 2px solid rgba(34, 211, 238, 0.6);
    }
    
    .logo-sphere::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: conic-gradient(from 0deg, transparent, #22d3ee, transparent, #06b6d4, transparent);
        border-radius: inherit;
        animation: logo-rotate 4s linear infinite;
        z-index: -1;
    }
    
    .logo-sphere::after {
        content: '';
        position: absolute;
        top: 20%;
        left: 20%;
        width: 30%;
        height: 30%;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        filter: blur(10px);
        animation: logo-shine 2s ease-in-out infinite alternate;
    }
    
    @keyframes logo-energy {
        0%, 100% { 
            transform: scale(1);
            box-shadow: 
                0 0 60px rgba(34, 211, 238, 0.8),
                0 0 120px rgba(34, 211, 238, 0.4);
        }
        50% { 
            transform: scale(1.05);
            box-shadow: 
                0 0 80px rgba(34, 211, 238, 1),
                0 0 160px rgba(34, 211, 238, 0.6);
        }
    }
    
    @keyframes logo-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes logo-shine {
        0% { opacity: 0.3; }
        100% { opacity: 0.8; }
    }
    
    .logo-icon {
        font-size: 56px;
        color: white;
        z-index: 2;
        text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
        animation: icon-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes icon-glow {
        0% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8); }
        100% { text-shadow: 0 0 40px rgba(255, 255, 255, 1); }
    }
    
    /* Titre avec effet néon cyan */
    .neon-title {
        font-size: clamp(3rem, 8vw, 5.5rem);
        font-weight: 900;
        background: linear-gradient(135deg, #ffffff 0%, #22d3ee 30%, #06b6d4 70%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-align: center;
        letter-spacing: -0.02em;
        line-height: 0.85;
        position: relative;
        text-shadow: 0 0 50px rgba(34, 211, 238, 0.5);
        animation: title-pulse 3s ease-in-out infinite;
    }
    
    .neon-title::before {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        background: transparent;
        color: #22d3ee;
        z-index: -1;
        filter: blur(15px);
        opacity: 0.7;
        animation: neon-flicker 2s ease-in-out infinite alternate;
    }
    
    @keyframes title-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
    }
    
    @keyframes neon-flicker {
        0% { opacity: 0.5; }
        100% { opacity: 1; }
    }
    
    .electric-subtitle {
        font-size: 1.2rem;
        color: #22d3ee;
        font-weight: 600;
        text-align: center;
        margin-top: 1.5rem;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        text-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
        animation: subtitle-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes subtitle-glow {
        0% { text-shadow: 0 0 20px rgba(34, 211, 238, 0.6); }
        100% { text-shadow: 0 0 30px rgba(34, 211, 238, 0.9); }
    }
    
    /* Cards cyberpunk avec cyan électrique */
    .cyber-grid-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
        gap: 3rem;
        margin-top: 5rem;
        z-index: 10;
        position: relative;
    }
    
    .cyber-card {
        background: 
            linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(8, 145, 178, 0.05) 100%),
            rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(34, 211, 238, 0.3);
        border-radius: 30px;
        padding: 2.5rem;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        height: 350px;
        display: flex;
        flex-direction: column;
        box-shadow: 
            0 0 50px rgba(34, 211, 238, 0.2),
            inset 0 1px 0 rgba(34, 211, 238, 0.1);
    }
    
    .cyber-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: 
            conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                rgba(34, 211, 238, 0.3) 90deg, 
                transparent 180deg,
                rgba(34, 211, 238, 0.2) 270deg,
                transparent 360deg);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.4s;
        animation: border-rotate 4s linear infinite;
    }
    
    .cyber-card::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.4s;
    }
    
    .cyber-card:hover::before,
    .cyber-card:hover::after {
        opacity: 1;
    }
    
    .cyber-card:hover {
        transform: translateY(-15px) scale(1.03);
        border-color: rgba(34, 211, 238, 0.8);
        box-shadow: 
            0 0 80px rgba(34, 211, 238, 0.4),
            0 30px 60px rgba(0, 0, 0, 0.3);
    }
    
    @keyframes border-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .card-icon-container {
        width: 80px;
        height: 80px;
        background: 
            radial-gradient(circle at 30% 30%, #22d3ee, #0891b2),
            linear-gradient(135deg, #06b6d4, #0e7490);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        position: relative;
        overflow: hidden;
        box-shadow: 
            0 0 30px rgba(34, 211, 238, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transition: all 0.3s;
        border: 2px solid rgba(34, 211, 238, 0.4);
    }
    
    .card-icon-container::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: conic-gradient(from 0deg, #22d3ee, transparent, #06b6d4, transparent);
        border-radius: inherit;
        animation: icon-spin 3s linear infinite;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .cyber-card:hover .card-icon-container::before {
        opacity: 1;
    }
    
    .cyber-card:hover .card-icon-container {
        transform: scale(1.15) rotate(5deg);
        box-shadow: 0 0 60px rgba(34, 211, 238, 1);
    }
    
    @keyframes icon-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .card-icon {
        font-size: 32px;
        color: white;
        z-index: 1;
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    }
    
    .cyber-title {
        font-size: 1.4rem;
        font-weight: 800;
        color: #22d3ee;
        text-align: center;
        margin-bottom: 1rem;
        text-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
    
    .cyber-description {
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        line-height: 1.5;
        flex-grow: 1;
        display: flex;
        align-items: center;
        font-size: 0.95rem;
        padding: 0 0.5rem;
    }
    
    /* Bouton électrique cyan */
    .electric-button {
        background: linear-gradient(135deg, #22d3ee, #0891b2);
        border: none;
        border-radius: 20px;
        padding: 20px 40px;
        color: white;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 
            0 0 30px rgba(34, 211, 238, 0.5),
            0 10px 30px rgba(0, 0, 0, 0.3);
        border: 2px solid rgba(34, 211, 238, 0.6);
    }
    
    .electric-button::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #06b6d4, #22d3ee);
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .electric-button:hover::before {
        opacity: 1;
    }
    
    .electric-button:hover {
        transform: translateY(-3px);
        box-shadow: 
            0 0 50px rgba(34, 211, 238, 0.8),
            0 15px 40px rgba(0, 0, 0, 0.4);
    }
    
    .button-content {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .loading-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Footer futuriste */
    .cyber-footer {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(34, 211, 238, 0.7);
        font-size: 1rem;
        z-index: 10;
        text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        font-weight: 600;
        letter-spacing: 1px;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .cyber-grid-cards {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 4rem;
        }
        
        .cyber-card {
            height: auto;
            min-height: 350px;
            padding: 2.5rem;
        }
        
        .logo-sphere {
            width: 120px;
            height: 120px;
        }
        
        .logo-icon {
            font-size: 48px;
        }
    }
</style>

<div class="electric-bg" style="height: 100vh; display: flex; align-items: center; justify-content: center; position: relative;">
    <!-- Grille cyber -->
    <div class="cyber-grid"></div>
    
    <!-- Lignes d'énergie -->
    <div class="energy-lines">
        <div class="energy-line"></div>
        <div class="energy-line"></div>
        <div class="energy-line"></div>
    </div>
    
    <div style="max-width: 1300px; width: 100%; padding: 0 2rem; position: relative; z-index: 10;">
        <!-- Header électrique -->
        <div style="text-align: center; margin-bottom: 3rem;">
            <div class="logo-sphere" style="margin: 0 auto 2.5rem;">
                <i class="fas fa-globe-americas logo-icon"></i>
            </div>
            <h1 class="neon-title" data-text="GPduMonde">GPduMonde</h1>
            <p class="electric-subtitle">Transport Cyber • Niveau Futur</p>
        </div>
        
        <!-- Cards cyberpunk -->
        <div class="cyber-grid-cards">
            <div class="cyber-card" onclick="handleElectricRedirect('index.php?page=landing', this)">
                <div class="card-icon-container">
                    <i class="fas fa-radar card-icon"></i>
                </div>
                <h2 class="cyber-title">Tracking Quantique</h2>
                <p class="cyber-description">
                    Système de suivi ultra-avancé avec intelligence artificielle, prédictions temps réel et localisation satellite precision sub-métrique.
                </p>
                <button class="electric-button">
                    <span class="button-content">
                        <span class="button-text">Initier Tracking</span>
                        <i class="fas fa-bolt button-icon"></i>
                        <i class="fas fa-spinner loading-spinner button-spinner" style="display: none;"></i>
                    </span>
                </button>
            </div>
            
            <div class="cyber-card" onclick="handleElectricRedirect('/login', this)">
                <div class="card-icon-container">
                    <i class="fas fa-network-wired card-icon"></i>
                </div>
                <h2 class="cyber-title">Control Center</h2>
                <p class="cyber-description">
                    Hub de contrôle neural avec analytics temps réel, dashboards holistiques et automatisation intelligente des flux globaux.
                </p>
                <button class="electric-button">
                    <span class="button-content">
                        <span class="button-text">Accès Système</span>
                        <i class="fas fa-bolt button-icon"></i>
                        <i class="fas fa-spinner loading-spinner button-spinner" style="display: none;"></i>
                    </span>
                </button>
            </div>
        </div>
    </div>
    
    <!-- Footer cyber -->
    <div class="cyber-footer pb-2">
        © 2025 GPduMonde • CYBER LOGISTICS • QUANTUM DELIVERY
    </div>
</div>

<!-- FontAwesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<script>
function handleElectricRedirect(url, card) {
    const button = card.querySelector('.electric-button');
    const text = button.querySelector('.button-text');
    const icon = button.querySelector('.button-icon');
    const spinner = button.querySelector('.button-spinner');
    
    // Animation électrique
    text.style.opacity = '0.6';
    icon.style.display = 'none';
    spinner.style.display = 'inline-block';
    
    // Effet sur la carte
    card.style.transform = 'scale(0.95)';
    card.style.filter = 'brightness(1.2)';
    button.disabled = true;
    
    setTimeout(() => {
        window.location.href = url;
    }, 700);
}

// Animation d'entrée cyberpunk
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.cyber-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(100px) scale(0.8)';
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 500 + (index * 200));
    });
});
</script>