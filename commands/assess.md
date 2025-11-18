# /assess - Evaluate Your JavaScript Knowledge

Use this command to assess your current JavaScript level and get personalized recommendations for your learning journey.

## How to Use

Type `/assess` to answer questions about your JavaScript knowledge and discover your level.

## Assessment Levels

### Beginner (0-6 months experience)
You're just starting your JavaScript journey.

**Characteristics:**
- Recently learned variables and data types
- Comfortable with basic if/else and loops
- Created a few simple functions
- Haven't worked with APIs or asynchronous code

**Next Steps:**
1. Start with **JavaScript Fundamentals Agent**
2. Focus on understanding scope and closures
3. Move to Functions & Scope Agent
4. Expected timeline: 4-6 weeks with daily practice

---

### Intermediate (6-18 months experience)
You know the basics and building real applications.

**Characteristics:**
- Comfortable with functions, scope, and closures
- Working with arrays and objects regularly
- Using async/await for API calls
- Building simple web pages with DOM manipulation
- Understanding of basic project structure

**Next Steps:**
1. Skip to **Modern ES6+ Agent** to update syntax
2. Learn **JavaScript Ecosystem** tools (npm, webpack, testing)
3. Deep dive into framework (React, Vue, Node.js)
4. Expected timeline: 2-3 weeks to refresh, then specialize

---

### Advanced (18+ months experience)
You're proficient and building professional applications.

**Characteristics:**
- Mastery of all fundamental concepts
- Comfortable with complex async patterns
- Using modern tools and frameworks
- Understanding of performance optimization
- Contributing to projects or building your own

**Next Steps:**
1. Deep dive into specific **frameworks** (React, Next.js, Vue)
2. Explore **backend** with Node.js and databases
3. Master **DevOps** and deployment
4. Focus on specific domains (AI, games, etc.)

---

## Self-Assessment Quiz

Answer these questions to find your level:

### Section 1: Core Concepts (5 questions)

**Q1: What will this log?**
```javascript
let x = 5;
{
  let x = 10;
  console.log(x);
}
console.log(x);
```
- A) 10, 5 (Correct! Understanding block scope)
- B) 5, 5 (Need to refresh scope)
- C) 10, 10 (Confusing var with let)

**Q2: What is a closure?**
- A) A function that has access to outer scope variables (Correct!)
- B) A function that's complete (Incomplete understanding)
- C) A function that closes something (Incorrect)

**Q3: What does this code do?**
```javascript
const arr = [1, 2, 3, 4, 5];
const result = arr.map(x => x * 2).filter(x => x > 5);
console.log(result);
```
- A) [6, 8, 10] (Correct! Understanding array methods)
- B) Can't tell (Need array methods practice)
- C) [2, 4, 6, 8, 10] (Misunderstanding filter)

**Q4: How does async/await work?**
- A) Makes async code look synchronous (Correct!)
- B) Makes async operations faster (Incomplete)
- C) Not familiar (Start with async agent)

**Q5: What's a prototype?**
- A) A template for objects in JavaScript (Correct!)
- B) A first version of something (Incomplete)
- C) Not sure (Review objects & arrays agent)

---

### Section 2: Practical Experience (5 questions)

**Q6: Have you built anything with:**
- HTML, CSS, and JavaScript DOM manipulation?
- API calls with fetch or axios?
- npm and node modules?

**Q7: Comfort level with:**
- Classes and inheritance?
- Destructuring?
- Module imports/exports?

**Q8: Have you used:**
- Testing frameworks (Jest, Mocha)?
- Build tools (Webpack, Vite)?
- Git for version control?

**Q9: Current Projects:**
- Building simple scripts?
- Frontend applications?
- Full-stack applications?
- Libraries or frameworks?

**Q10: Learning Goals:**
- Master fundamentals?
- Become professional developer?
- Specialize in frontend/backend?
- Build specific projects?

---

## Scoring Guide

### Score: 0-3 Correct
**Your Level: Beginner**

You're at the start of your JavaScript journey. This is perfect!

**Recommended Path:**
1. Start with Agent 1: **JavaScript Fundamentals**
2. Learn core concepts deeply
3. Move through agents sequentially
4. **Timeline:** 4-6 weeks with daily practice (1-2 hours/day)

**Quick Wins:**
- Master variables, operators, and control flow this week
- Build a simple calculator or game
- Feel confident with basic JavaScript

---

### Score: 4-7 Correct
**Your Level: Intermediate**

You have a solid foundation. Time to deepen and modernize!

**Recommended Path:**
1. Quick refresher: Agent 1 (2-3 days)
2. Skip ahead to Agent 4: **Asynchronous JavaScript**
3. Jump to Agent 6: **Modern ES6+**
4. Focus on Agent 7: **JavaScript Ecosystem**
5. **Timeline:** 2-3 weeks intensive

**Quick Wins:**
- Learn async/await mastery
- Understand modern syntax deeply
- Set up professional projects with npm/webpack
- Build real applications

---

### Score: 8-10 Correct
**Your Level: Advanced**

You have strong fundamentals. Time to specialize!

**Recommended Path:**
1. Skim through agents as reference
2. Specialize in a **framework** (React, Vue, Angular, Next.js)
3. Explore **backend** with Node.js/Express/databases
4. Master **DevOps**, deployment, CI/CD
5. **Timeline:** Varies by specialization

**Next Skills:**
- Framework-specific learning
- Advanced architectural patterns
- Performance optimization
- System design

---

## Personalized Recommendations

### If You Answered Most Questions About...

**Fundamentals:** → Start with **Agent 1: JavaScript Fundamentals**

**Functions and Scope:** → Focus on **Agent 2: Functions & Scope**

**Objects/Arrays:** → Practice **Agent 3: Objects & Arrays**

**Async Operations:** → Master **Agent 4: Asynchronous**

**Web Development:** → Learn **Agent 5: DOM & Browser APIs**

**Modern Code:** → Study **Agent 6: Modern ES6+**

**Professional Setup:** → Complete **Agent 7: Ecosystem**

---

## Honest Self-Assessment

For an accurate assessment, ask yourself:

1. **Can I write a function that returns another function?** (Closures)
2. **Do I understand the event loop?** (Async)
3. **Can I use array methods (map, filter, reduce)?** (Arrays)
4. **Have I worked with APIs?** (Async + DOM)
5. **Do I know what npm is?** (Ecosystem)

If you said "yes" to 4-5, you're probably intermediate or advanced.
If you said "yes" to 2-3, you're probably beginner/intermediate.
If you said "no" to most, start with fundamentals.

---

## After Assessment

**Next Steps:**

1. **Identify your starting agent** based on results
2. **Set learning goals** - Time commitment and focus areas
3. **Use `/learn`** command to start structured learning
4. **Practice daily** - Consistency is key
5. **Reassess in 2-4 weeks** to track progress

---

## Get Help

- **Questions?** Ask me anything about your level
- **Struggling?** I can help with specific topics
- **Want Projects?** Use `/projects` for hands-on practice
- **Ready to Learn?** Use `/learn` to start your path

---

**Ready to assess your JavaScript knowledge?** Type `/assess` and let's find your perfect starting point!
