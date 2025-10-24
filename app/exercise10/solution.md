# Exercise 10 Solution: B2B Dashboard UX Problem

## 🎯 The Problem

Users report difficulty finding data in a large, complex table dashboard. The UI feels overwhelming.

---

## 🔍 Discovery Questions

Before jumping to solutions, I'd ask:

### 👤 To the User:

- Walk me through what you're trying to accomplish when you use this dashboard (Or we can also use Hotjar to record sessions of the user)
- Which columns do you actually need for your daily tasks?
- Are you typically searching for specific records or analyzing patterns?
- What happens after you find the data you need?

### 💼 To the Product Manager:

- What are the top 3 user workflows for this dashboard?
- Do we have some analytics on column interaction/visibility?
- Are there different type of users with different needs?
- What's the business goal this dashboard serves?
- Any constraints on timeline or engineering resources?

These answers would validate assumptions and guide solution prioritization.

---

# 💡 Three Proposed Solutions

## Solution 1: Column Customization with Persistence

Let users show/hide columns and remember their preferences.

**Implementation:**

- Add a column visibility toggle (dropdown or sidebar)
- Store preferences in localStorage (MVP) or user settings (production)
- Smart defaults: hide less-used columns initially
- Quick reset to default view

**✅ `Pros:`**

- Directly addresses "overwhelming" feedback
- Users control their own experience
- Foundation for saved views later
- No backend changes required (for MVP)

**⚠️ `Cons:`**

- Requires users to configure
- Doesn't help with data discovery
- Need sensible defaults or users might hide important columns

---

## Solution 2: 🔎 Smart Filtering & Multi-Field Search

Add a dynamic/customizable filter bar with saved search capability.

**Implementation:**

- Multi-field search with autocomplete
- Quick filters for common criteria (date ranges, status, etc.)
- Combination filters (AND/OR logic)
- Save frequently-used filter combinations
- Visual indication of active filters

**✅ `Pros:`**

- Helps users find specific records quickly
- Reduces cognitive load (less scrolling/scanning)
- Saved filters = personalized experience
- Scales well as data grows

**⚠️ `Cons:`**

- Doesn't reduce visual overwhelm if table still shows all columns
- Performance implications if not done right
- Needs backend work for efficient queries
- More complex to get UX right (good filter UI is hard)

---

## Solution 3: 📋 Role-Based View Templates

Create curated view templates for common use cases/personas.

**Implementation:**

- Pre-configured views (e.g., "Sales Overview", "Financial Summary", "Operations Daily")
- Each view has preset columns, filters, and grouping
- Users can switch between views or customize their own
- Analytics to understand which views are most valuable

**✅ `Pros:`**

- Guides users to best practices
- Reduces decision fatigue
- Can encode domain expertise into views
- Good for onboarding new users
- Combines column + filter benefits

**⚠️ `Cons:`**

- Requires upfront research to get views right
- Risk of creating views that don't match actual usage
- More moving parts to maintain
- Might not fit edge cases
- Need ongoing iteration based on usage

---

## 🏆 Recommendation for Next Sprint

### 🚀 Ship Solution 1: Column Customization

Here's why:

1.**🎯 Lowest risk, highest certainty** - We know this will help because it directly addresses "too much on screen"

2.**⚡ Quick win** - Can ship in one sprint and get user feedback fast

3.**🔓 No dependencies** - Pure frontend, no backend work, no infrastructure changes

4.**🏗️ Foundation for future features** - Column state management is needed for saved views anyway

5.**📊 Immediate measurability** - Easy to track which columns users hide/show, informing future decisions

---

### 🤔 Why Not the Others?

The filtering solution (Solution 2) is tempting because it's convincent and addresses "finding data," but it doesn't solve the overwhelming UI problem. Users will still see N columns even if they filter to 10 rows.

View templates (Solution 3) are the ultimate solution but require knowing user workflows first. Let's get column customization out, collect data on what columns people actually use, then build templates based on real usage patterns.

---

### ✨ Don't forget:

- Analytics on which columns are hidden/shown most
- A/B test default hidden columns
- Keyboard shortcuts for power users
- Mobile-responsive column picker
- Bulk operations (show/hide by category)

## 🗓️ Follow-up Work

After column customization ships:

1. **📅 Week 1-2 post-launch:** Monitor analytics, gather user feedback
2. **🎯 Next sprint:** Add quick filter bar for most-used fields (low-hanging fruit from Solution 2)
3. **🚀 2-3 sprints out:** Use column usage data to build view templates (Solution 3)

This iterative approach reduces risk and ensures each feature is informed by actual usage data.

---

**💭 Final Thought:** Start small, measure everything, iterate based on data. The best UX solution is the one users actually use.
