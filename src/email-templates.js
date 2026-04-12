export const REMINDER_7_DAY = {
  subject: "Your Custodi Parvulos Retreat is One Week Away",
  body: (parish, date, contact) => `Dear ${contact},

Your parish retreat at ${parish} is one week away — ${date}.

Here is a quick checklist to prepare:

- Confirm your chapel is available for Eucharistic Adoration from 9:00 AM to 3:30 PM
- Remind participants of the date and ${parish} location
- Arrange continental breakfast and lunch for your group
- Ensure a priest is available to celebrate Mass at 9:00 AM
- Prepare a monstrance and hosts for Exposition

The day begins at 8:00 AM with breakfast and concludes at 4:00 PM after Benediction.

If you have any questions, reply to this email.

In Christ,
Custodi Parvulos Team

Pie Pelicane, custodi parvulos`,
};

export const REMINDER_3_DAY = {
  subject: "3 Days Until Your Custodi Parvulos Retreat",
  body: (parish, date, contact) => `Dear ${contact},

Your retreat at ${parish} is this ${date}. We are praying for your parish.

Final preparations:
- Send a reminder to all participants (a sample message is below)
- Confirm meal arrangements
- Prepare printed materials (we will bring formation booklets)
- Test any audio/speaker equipment for sacred music

Sample message for participants:
"Dear friends, our Custodi Parvulos retreat is this ${date} at ${parish}. Please arrive by 8:00 AM for breakfast. Mass begins at 9:00 AM, followed by a full day of formation in Eucharistic Adoration. We will conclude with Benediction at 3:30 PM. Please come with an open heart — the Lord has something to say to each of us."

In Christ,
Custodi Parvulos Team`,
};

export const REMINDER_1_DAY = {
  subject: "Tomorrow: Your Custodi Parvulos Retreat",
  body: (parish, date, contact) => `Dear ${contact},

Tomorrow is the day. We are coming to ${parish} to walk through the Drama of Salvation together in the presence of the Blessed Sacrament.

Tomorrow's schedule:
8:00 AM — Gathering & Continental Breakfast
9:00 AM — Holy Mass
10:00 AM — Exposition & Part I: Creatio
10:45 AM — Part II: Lapsus
11:30 AM — Part III: Formatio Populi Sancti
12:15 PM — Angelus, Benediction & Lunch
1:15 PM — Re-Exposition & Part IV: Messias
2:00 PM — Part V: Ecclesia
2:45 PM — Reflection & Discussion
3:15 PM — Chaplet of Divine Mercy
3:30 PM — Commitment & Benediction

Please pray tonight for everyone who will attend. Ask the Holy Spirit to prepare their hearts.

See you tomorrow.

In Christ,
Custodi Parvulos Team`,
};

export const FOLLOWUP_PARTICIPANT = {
  subject: "Thank You for Your Retreat — Share Your Experience",
  body: (name, parish, date) => `Dear ${name},

Thank you for participating in the Custodi Parvulos retreat at ${parish} on ${date}. We pray that the formation you received — in the presence of the Blessed Sacrament — will bear fruit in your life and ministry.

We would be deeply grateful if you would share a brief testimony about your experience. Your words help other parishes discover this formation.

Share your testimony here:
[TESTIMONIAL_LINK]

A few questions to guide you:
- What moment during the retreat stood out to you?
- How did doing the formation in Adoration affect the experience?
- What will you carry with you from this day?

Your testimony can be as short as a sentence or as long as you like. Every voice matters.

With gratitude in Christ,
Custodi Parvulos Team

Pie Pelicane, custodi parvulos`,
};

export const FOLLOWUP_PARISH = {
  subject: "How Was Your Retreat? We'd Love to Hear",
  body: (contact, parish, date) => `Dear ${contact},

Thank you for bringing the Custodi Parvulos retreat to ${parish} on ${date}. It was a privilege to serve your community.

A few follow-up items:

1. TESTIMONIES — We have sent each participant an invitation to share their experience. If you would also like to share your perspective as the organizer, you can do so here: [TESTIMONIAL_LINK]

2. CERTIFICATES — Completion records for all participants have been logged. You can access them through your parish admin dashboard.

3. TELL ANOTHER PARISH — If you know another parish that would benefit from this formation, please share our website with them. Word of mouth from pastors and coordinators like you is how this grows.

4. FEEDBACK — If there is anything we could improve, please reply to this email. We take every suggestion seriously.

Thank you for your courage in choosing formation over mere compliance.

In Christ,
Custodi Parvulos Team`,
};

export const NEWSLETTER_DEFAULT = {
  subject: "",
  body: "",
};
