// Global variables
let subjects = [{ id: "1", name: "", marks: 0, credits: 3, grade: "", gradePoints: 0 }]
let cgpa = 0

// Scholarship data
const scholarships = [
  {
    name: "Excellence Merit Scholarship",
    provider: "University Foundation",
    minCGPA: 3.8,
    maxCGPA: 4.0,
    amount: "₹2,50,000",
    description: "For students with outstanding academic performance",
    eligibility: ["Minimum 3.8 CGPA", "Full-time enrollment", "Community service"],
  },
  {
    name: "Academic Achievement Award",
    provider: "Education Trust",
    minCGPA: 3.5,
    maxCGPA: 4.0,
    amount: "₹1,50,000",
    description: "Supporting high-achieving students in their academic journey",
    eligibility: ["Minimum 3.5 CGPA", "Leadership experience", "Essay required"],
  },
  {
    name: "Dean's List Scholarship",
    provider: "College Administration",
    minCGPA: 3.3,
    maxCGPA: 4.0,
    amount: "₹1,25,000",
    description: "Recognition for consistent academic excellence",
    eligibility: ["Minimum 3.3 CGPA", "No disciplinary actions", "Recommendation letter"],
  },
  {
    name: "Progress Scholarship",
    provider: "Student Support Fund",
    minCGPA: 3.0,
    maxCGPA: 3.4,
    amount: "₹75,000",
    description: "Encouraging students showing academic improvement",
    eligibility: ["Minimum 3.0 CGPA", "Financial need", "Academic improvement"],
  },
  {
    name: "Foundation Support Grant",
    provider: "Alumni Association",
    minCGPA: 2.5,
    maxCGPA: 3.2,
    amount: "₹50,000",
    description: "Supporting students in their academic development",
    eligibility: ["Minimum 2.5 CGPA", "First-generation college student", "Community involvement"],
  },
]

// Grade conversion function
function getGradeFromMarks(marks) {
  if (marks >= 90) return { grade: "A+", gradePoints: 4.0 }
  if (marks >= 85) return { grade: "A", gradePoints: 3.7 }
  if (marks >= 80) return { grade: "A-", gradePoints: 3.3 }
  if (marks >= 75) return { grade: "B+", gradePoints: 3.0 }
  if (marks >= 70) return { grade: "B", gradePoints: 2.7 }
  if (marks >= 65) return { grade: "B-", gradePoints: 2.3 }
  if (marks >= 60) return { grade: "C+", gradePoints: 2.0 }
  if (marks >= 55) return { grade: "C", gradePoints: 1.7 }
  if (marks >= 50) return { grade: "C-", gradePoints: 1.3 }
  if (marks >= 45) return { grade: "D", gradePoints: 1.0 }
  return { grade: "F", gradePoints: 0.0 }
}

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

// Single grade converter
function initializeGradeConverter() {
  const marksInput = document.getElementById("single-marks")
  const gradeDisplay = document.getElementById("single-grade")
  const pointsDisplay = document.getElementById("single-points")

  marksInput.addEventListener("input", () => {
    const marks = Number.parseInt(marksInput.value) || 0
    const gradeInfo = getGradeFromMarks(marks)

    gradeDisplay.textContent = gradeInfo.grade
    pointsDisplay.textContent = gradeInfo.gradePoints.toFixed(1)
  })
}

// Subject management
function createSubjectHTML(subject, index) {
  return `
        <div class="subject-card" data-id="${subject.id}">
            <div class="subject-header">
                <h4 class="subject-title">Subject ${index + 1}</h4>
                ${subjects.length > 1 ? `<button class="btn btn-danger" onclick="removeSubject('${subject.id}')"><i class="fas fa-trash"></i></button>` : ""}
            </div>
            <div class="subject-grid">
                <div class="form-group">
                    <label>Subject Name</label>
                    <input type="text" value="${subject.name}" placeholder="e.g., Mathematics" onchange="updateSubject('${subject.id}', 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>Marks</label>
                    <input type="number" min="0" max="100" value="${subject.marks}" placeholder="0-100" onchange="updateSubject('${subject.id}', 'marks', parseInt(this.value) || 0)">
                </div>
                <div class="form-group">
                    <label>Credits</label>
                    <select onchange="updateSubject('${subject.id}', 'credits', parseInt(this.value))">
                        <option value="1" ${subject.credits === 1 ? "selected" : ""}>1</option>
                        <option value="2" ${subject.credits === 2 ? "selected" : ""}>2</option>
                        <option value="3" ${subject.credits === 3 ? "selected" : ""}>3</option>
                        <option value="4" ${subject.credits === 4 ? "selected" : ""}>4</option>
                        <option value="5" ${subject.credits === 5 ? "selected" : ""}>5</option>
                        <option value="6" ${subject.credits === 6 ? "selected" : ""}>6</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Grade</label>
                    <div class="grade-display">
                        <span class="grade-badge">${subject.grade}</span>
                        <span class="points">(${subject.gradePoints})</span>
                    </div>
                </div>
            </div>
        </div>
    `
}

function renderSubjects() {
  const container = document.getElementById("subjects-container")
  container.innerHTML = subjects.map((subject, index) => createSubjectHTML(subject, index)).join("")
}

function addSubject() {
  const newSubject = {
    id: Date.now().toString(),
    name: "",
    marks: 0,
    credits: 3,
    grade: "",
    gradePoints: 0,
  }
  subjects.push(newSubject)
  renderSubjects()
}

function removeSubject(id) {
  if (subjects.length > 1) {
    subjects = subjects.filter((subject) => subject.id !== id)
    renderSubjects()
  }
}

function updateSubject(id, field, value) {
  subjects = subjects.map((subject) => {
    if (subject.id === id) {
      const updated = { ...subject, [field]: value }
      if (field === "marks") {
        const gradeInfo = getGradeFromMarks(value)
        updated.grade = gradeInfo.grade
        updated.gradePoints = gradeInfo.gradePoints
      }
      return updated
    }
    return subject
  })
  renderSubjects()
}

function calculateCGPA() {
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0)
  const totalGradePoints = subjects.reduce((sum, subject) => sum + subject.gradePoints * subject.credits, 0)
  cgpa = totalCredits > 0 ? Math.round((totalGradePoints / totalCredits) * 100) / 100 : 0

  // Update CGPA display
  const resultDiv = document.getElementById("cgpa-result")
  const valueDiv = document.getElementById("cgpa-value")
  const messageDiv = document.getElementById("cgpa-message")

  if (cgpa > 0) {
    resultDiv.style.display = "block"
    valueDiv.textContent = cgpa.toFixed(2)

    let message = "Keep working hard!"
    if (cgpa >= 3.5) message = "Excellent performance!"
    else if (cgpa >= 3.0) message = "Good performance!"
    else if (cgpa >= 2.5) message = "Satisfactory performance"

    messageDiv.textContent = message

    // Update scholarships
    updateScholarships()
  }
}

function getEligibleScholarships() {
  return scholarships.filter((scholarship) => cgpa >= scholarship.minCGPA && cgpa <= scholarship.maxCGPA)
}

function createScholarshipHTML(scholarship) {
  return `
        <div class="scholarship-card">
            <div class="scholarship-header">
                <div class="scholarship-info">
                    <h3>${scholarship.name}</h3>
                    <p class="provider">${scholarship.provider}</p>
                </div>
                <div class="scholarship-amount">${scholarship.amount}</div>
            </div>
            <p class="scholarship-description">${scholarship.description}</p>
            <div class="eligibility">
                <h4>Eligibility Requirements:</h4>
                <ul>
                    ${scholarship.eligibility.map((req) => `<li>${req}</li>`).join("")}
                </ul>
            </div>
            <div class="scholarship-footer">
                <span>CGPA Range: ${scholarship.minCGPA} - ${scholarship.maxCGPA}</span>
                <span class="eligible-badge">✓ Eligible</span>
            </div>
        </div>
    `
}

function updateScholarships() {
  const container = document.getElementById("scholarships-container")
  const description = document.getElementById("scholarship-description")

  if (cgpa > 0) {
    description.textContent = `Based on your CGPA of ${cgpa}, here are scholarships you may be eligible for:`

    const eligibleScholarships = getEligibleScholarships()

    if (eligibleScholarships.length > 0) {
      container.innerHTML = eligibleScholarships.map((scholarship) => createScholarshipHTML(scholarship)).join("")
    } else {
      container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-award empty-icon"></i>
                    <h3>No scholarships found</h3>
                    <p>Keep working hard! Improve your CGPA to unlock more scholarship opportunities.</p>
                </div>
            `
    }
  } else {
    description.textContent = "Calculate your CGPA first to see personalized scholarship recommendations"
    container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calculator empty-icon"></i>
                <h3>Calculate your CGPA first</h3>
                <p>Go to the CGPA Calculator tab to calculate your CGPA and get personalized scholarship recommendations.</p>
            </div>
        `
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeTabs()
  initializeGradeConverter()
  renderSubjects()

  // Add event listeners
  document.getElementById("add-subject").addEventListener("click", addSubject)
  document.getElementById("calculate-cgpa").addEventListener("click", calculateCGPA)

  // Initialize scholarships view
  updateScholarships()
})
