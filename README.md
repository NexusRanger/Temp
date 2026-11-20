# Self-Defence Needs Diagnostic & Training Matcher

An interactive assessment web application designed for prospective students evaluating **Jeth Randolph's Stroud-based self-defence classes** (Force Necessary UK) and comparing their personal requirements against alternative martial arts and combat disciplines.

---

## Features

1. **Interactive 7-Parameter Diagnostic**:
   - **Asymmetric & Threat Survival**: Street violence, knives, improvised weapons, group attacks, and unpredictable aggression.
   - **De-Escalation & UK Law**: Situational awareness, vocal boundary setting, adrenaline control, and UK "reasonable force" legal limits.
   - **Competitive / Sport & Medals**: Tournaments, point-scoring, weight categories, and trophies.
   - **Functional Fitness & Stamina**: Functional conditioning, core strength, explosiveness, and combat endurance.
   - **Mental Resilience & Stress Inoculation**: Adrenal stress management, panic suppression, and composure under pressure.
   - **Accessibility, Safety & Low Injury Risk**: Ego-free, low-injury training safe for working adults and beginners.
   - **Technical Progression & Structure**: Clear modular syllabus, rank advancement, and long-term mastery under Hock Hochheim's international Force Necessary syllabus.

2. **Live Spider / Radar Chart (Chart.js)**:
   - Real-time visual plotting of the user's requirements.
   - Interactive toggle overlays for benchmark systems:
     - **Jeth Randolph (Force Necessary UK – Stroud)**
     - **Combat Sports / MMA & BJJ**
     - **Traditional Martial Arts (Karate / Taekwondo)**
     - **Generic Krav Maga**
     - **Boxing & Muay Thai**

3. **Dynamic Match Fit & Feedback Engine**:
   - Computes weighted compatibility percentage.
   - Explains precisely why Jeth's class fits their needs (or transparently redirects them if they are seeking tournament medals and sport point-fighting).

4. **Stroud Class Onboarding Banner**:
   - Location: Lansdown Hall, Stroud (Tuesdays 7:00 PM – 8:00 PM).
   - Instructor credentials: Level 12 Master Instructor (3rd Dan), Knife L5 Instructor.
   - "Print / Save Assessment" feature for prospective student intake.

---

## File Structure

- `index.html` — Clean semantic HTML5 page layout.
- `styles.css` — Modern dark/light responsive styling with vibrant color-coded slider tracks and glowing accents.
- `systems-data.js` — Benchmark calibrations, questions, preset personas, and system strengths/limitations.
- `app.js` — Radar chart rendering, slider event listeners, and compatibility calculation logic.

---

## How to Run & Preview

You can open the tool in any modern web browser:

1. **Directly**: Double-click [index.html](file:///c:/Data/Antigravity/Self%20Defence/index.html).
2. **Via Local Server**:
   ```bash
   python -m http.server 3456
   ```
   Then open `http://localhost:3456` in your browser.
