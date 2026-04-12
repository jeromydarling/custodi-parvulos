// ═══════════════════════════════════════════════════════════════
// CUSTODI PARVULOS — Complete Formation Content
// All theological content from the training guide document
// Plus enrichments: discussion questions, Lectio in all modules,
// convergence table, Five Wounds walkthrough
// ═══════════════════════════════════════════════════════════════

import { Sparkles, Diamond, Hexagon, Cross, Church, Sun, Circle, Leaf, Star, Bird, Crown, Flame } from "lucide-react";

// ─── PARTS: Full content from the Word document ───

export const PARTS = [
  {
    id: "creation",
    num: "I",
    title: "Creation",
    latin: "Creatio",
    subtitle: "The Original Design of the Human Person",
    tagline: "In the beginning, God spoke the human person into existence as a masterwork of love",
    Icon: Sparkles,
    color: "#C9A84C",
    meditation: {
      wound: { label: "The Wound", value: "The Right Hand — the hand that creates, that shapes, that blesses" },
      sense: { label: "The Sense", value: "Sight — \"And God saw that it was good\" (Genesis 1:31)" },
      mystery: { label: "The Mystery", value: "The Annunciation — God's creative Word takes flesh" },
      precept: { label: "The Precept", value: "Attend Mass on Sundays — where we encounter the Creator in the Eucharist" },
      pentateuch: { label: "The Book", value: "Genesis — the book of beginnings, of the original design" },
    },
    scripture: { text: "So God created man in his own image, in the image of God he created him; male and female he created them.", ref: "Genesis 1:27" },
    introduction: `We begin where God begins: with creation. Before we can understand what went wrong, we must recover a vision of what was intended. The Theology of the Body opens not with a catalog of sins but with an act of contemplation — John Paul II invites us to return, as Christ Himself did when questioned by the Pharisees, to "the beginning."

This is not mere nostalgia for Eden. It is a methodological principle: the truth about the human person is revealed first in the Creator's design, not in the distortions introduced by sin. Just as a physician must understand healthy anatomy before diagnosing disease, the Church must articulate the full truth of the human person before addressing the pathologies that led to the abuse crisis.`,
    sections: [
      {
        title: "The Body Reveals the Person",
        content: `The foundational insight of the Theology of the Body is that the human body is not merely a biological instrument or an object to be used; it is a revelation of the person. The human person is a body-soul unity — not a soul trapped in a body, and not a body without spiritual significance. The body makes visible what is invisible: the spiritual and the divine. Every human body, in its masculinity or femininity, speaks a language — what John Paul II called "the language of the body" — that must be spoken truthfully.

This principle stands in direct contradiction to the mentality that made abuse possible. When a person in authority uses another person's body as an object of gratification — especially the body of a child or adolescent — that act is not merely a violation of civil law or institutional policy. It is a lie spoken with the body. It contradicts the fundamental truth that every person is a subject, never an object; a gift to be received, never a thing to be consumed.

Genesis opens the Pentateuch with this revelation: in the beginning, God saw everything He had made, and it was very good. The sense of sight, the first sense engaged in creation, is the sense we must recover. We must learn again to see each person — each child, each parishioner, each brother priest — as God sees them: as an image of the divine, invested with inviolable dignity.`,
        reflectionPause: "Pause here. Consider: How do you see the people in your ministry? Do you see them as God sees them — as images of the divine? Or have you allowed familiarity, routine, or fatigue to diminish their sacred dignity in your eyes?",
        discussionQuestions: [
          "How does the view that \"the body reveals the person\" change the way we understand physical boundaries with children and vulnerable persons?",
          "If the body is not merely biological but reveals the whole person, what does that mean for how we treat someone's physical space, their comfort, their autonomy?",
        ],
      },
      {
        title: "The Nuptial Meaning of the Body",
        content: `John Paul II taught that the body has a "nuptial meaning" — the human body is created for the sincere gift of self to another. This nuptial meaning is expressed in marriage through the total, faithful, and fruitful self-giving of husband and wife. But it is also expressed in celibacy and virginity for the sake of the Kingdom, wherein the celibate person gives himself entirely to God and to the service of others.

In both vocations, the body's meaning is fulfilled through self-donation, never through self-gratification at the expense of another. Drawing on the Second Vatican Council's Gaudium et Spes, John Paul II articulated the "law of the gift": the human person can fully discover his true self only in a sincere gift of self. This law reflects the inner life of the Trinity — three Persons in an eternal communion of self-giving love.

This law of the gift is the theological key that unlocks the meaning of every authentic human relationship, from marriage to priesthood to the teacher-student bond to the volunteer who serves at a parish food bank. Every relationship is meant to be governed by the question: Am I giving myself for the good of this person, or am I taking something from them for my own gratification?`,
        reflectionPause: "The law of the gift governs every relationship. In your own ministry — whether as a priest, teacher, volunteer, or parent — where are you genuinely giving yourself? Where might you be, even subtly, taking something for yourself?",
        discussionQuestions: [
          "The John Jay studies found that abusers often exhibited \"intimacy deficits\" and difficulty forming adult relationships. How does the theological principle that we are made for communion illuminate this finding?",
          "What does it mean practically for a celibate priest or religious to live the \"nuptial meaning\" of the body — to live as a person made for self-gift?",
        ],
      },
      {
        title: "The Inseparable Connection: Humanae Vitae's Universal Principle",
        content: `While Humanae Vitae is most often discussed in the context of married love, its core teaching has universal significance. Paul VI taught that God established an inseparable connection between the unitive meaning and the procreative meaning of the conjugal act. This is not merely a rule about contraception; it is a statement about the nature of human sexuality itself. Sexuality is ordered toward both loving union and the possibility of new life. When these dimensions are deliberately separated, the act ceases to speak the truth about the human person.

This principle illuminates the abuse crisis profoundly. Sexual abuse is the most extreme form of separating sexuality from its true meaning. It severs the act entirely from love, commitment, mutual self-giving, and openness to life. It reduces sexuality to a mechanism of power, control, and self-gratification. When a culture — including the culture within the Church — loses sight of the integral meaning of sexuality, the conditions are created for all forms of sexual disorder, including the exploitation of the vulnerable.

At the Annunciation — the first Joyful Mystery of the Rosary — the creative Word of God took flesh in the womb of the Virgin Mary. God Himself entered creation through a human body, forever consecrating the body as the site of divine encounter. Every act of abuse is a desecration of what the Annunciation revealed: that the human body is holy ground.`,
        reflectionPause: "The human body is holy ground. Sit with that sentence. What does it mean for how you approach every interaction with another person — especially a child or someone in your care?",
        discussionQuestions: [
          "Paul VI predicted that separating sexuality from its full meaning would lead to a loss of respect for persons. How have we seen this play out in our culture? In our Church?",
          "If the body is \"holy ground,\" what are the practical implications for how we design ministry spaces, supervise interactions, and train volunteers?",
        ],
      },
      {
        title: "Self-Mastery as the Condition of Self-Gift",
        content: `A recurring theme in the Theology of the Body is that genuine love requires self-mastery — what the tradition calls temperance or continence. Self-mastery is not repression. It is the interior freedom that enables a person to make a genuine gift of himself. No one can give what he does not possess. A person governed by disordered desires rather than governing them cannot truly love. He can only consume, manipulate, or dominate.

This principle has particular urgency for those who embrace celibacy. Celibacy lived without self-mastery is not a gift freely given; it is a burden reluctantly endured, and it becomes a source of interior pressure that can manifest in destructive ways.

The first Precept of the Church — attending Mass on Sundays and holy days — is not incidental to this vision. The Eucharist is where we encounter the supreme act of bodily self-gift: Christ saying with His body, "This is my body, given for you." Regular participation in the Eucharist is the primary school of self-gift, the place where we learn what the body is for.`,
        reflectionPause: "Self-mastery is not repression — it is freedom. Where in your own life do you experience the difference? Where do you feel governed by desire rather than governing it? What practices of prayer, sacrament, and community support your interior freedom?",
        discussionQuestions: [
          "What practical steps can our parish or community take to ensure that no one — priest, teacher, volunteer, or parishioner — is left in the kind of isolation that becomes a risk factor?",
          "How does regular participation in the Eucharist form us in the habit of self-gift? What happens when this practice is neglected?",
        ],
      },
    ],
    lectio: {
      text: "Then the Lord God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature.",
      ref: "Genesis 2:7",
      prompts: [
        "Read the passage slowly, twice. What word or phrase draws your attention?",
        "Imagine being present at this moment — God bending close, breathing life into clay. What do you see? What do you feel?",
        "What is God saying to you, personally, through this passage about the dignity of the body?",
        "Rest in silence. What response rises in your heart?",
      ],
    },
    reflection: "As you consider the truth that the body reveals the person, examine your own heart. How do you see the people you serve in ministry? Do you see them as images of God — or have you allowed yourself to see anyone as less than fully human, fully dignified, fully sacred?",
  },

  {
    id: "fall",
    num: "II",
    title: "The Fall",
    latin: "Lapsus",
    subtitle: "What the John Jay Studies Revealed",
    tagline: "Sin entered the world, and with it the distortion of everything God had made good",
    Icon: Diamond,
    color: "#8B4553",
    meditation: {
      wound: { label: "The Wound", value: "The Left Hand — the hand that receives; the Church received blows from within" },
      sense: { label: "The Sense", value: "Taste — the forbidden fruit; the bitter knowledge of what was done" },
      mystery: { label: "The Mystery", value: "The Agony in the Garden — Christ foresaw all the sins committed in His name" },
      precept: { label: "The Precept", value: "Confess sins at least once a year — confession begins with examination of conscience" },
      pentateuch: { label: "The Book", value: "Exodus — a people enslaved, crying out for deliverance" },
    },
    scripture: { text: "They heard the sound of the Lord God walking in the garden in the cool of the day, and the man and his wife hid themselves.", ref: "Genesis 3:8" },
    introduction: `After creation comes the Fall. The Drama of Salvation does not flinch from the reality of sin, and neither can the Church. The two studies produced by the John Jay College of Criminal Justice — The Nature and Scope of Sexual Abuse of Minors (2004) and The Causes and Context of Sexual Abuse of Minors (2011) — are the Church's examination of conscience, her unflinching look at what happened when the truth about the human person was lost.

In the Garden, Adam and Eve tasted the forbidden fruit and their eyes were opened — but what they saw was their own shame. The sense associated with the Fall is taste: the bitter knowledge of evil, the sickening realization of what was consumed. As the second Precept of the Church reminds us, confession begins with an examination of conscience. Before there can be absolution, there must be truth.`,
    sections: [
      {
        title: "The Scale and Timeline of the Crisis",
        content: `The Nature and Scope study documented approximately 10,667 credible allegations of sexual abuse against 4,392 priests and deacons — roughly 4 percent of the more than 109,000 clergy active during the fifty-year study period. The remaining 96 percent were never accused. But the 4 percent who offended caused devastating harm to thousands of victims and to the credibility of the Church's mission.

The timeline follows a distinctive pattern: incidents increased steadily from the mid-1960s, peaked in the late 1970s, and declined sharply through the 1980s, remaining at very low levels thereafter. This temporal pattern is essential because it rules out factors that remained constant throughout the period as primary causes.`,
        reflectionPause: "These are not abstract numbers. Each of those 10,667 allegations represents a real person — a child or adolescent whose trust was violated by someone who should have been a spiritual father. Allow yourself to feel the weight of this before continuing.",
        discussionQuestions: [
          "Why is the timeline pattern (rising in the 1960s, peaking in the 1970s, declining in the 1980s) so important for understanding the causes?",
          "What does it tell us that 96 percent of priests were never accused? How do we hold both realities — the scope of the harm and the faithfulness of the majority — without diminishing either?",
        ],
      },
      {
        title: "What the Studies Ruled Out",
        content: `The John Jay researchers explicitly addressed several theories about the cause of the crisis:

Priestly celibacy, constant in the Latin Rite since the eleventh century, could not account for a dramatic rise and fall of abuse incidents concentrated in a twenty-year window.

The exclusively male priesthood remained constant and thus could not explain the specific historical pattern.

Fewer than 5 percent of abusing priests exhibited behavior consistent with a clinical diagnosis of pedophilia. The vast majority of victims were post-pubescent adolescents, and most abusing priests also had sexual contact with adults. Researchers characterized them as behavioral "generalists" rather than specialists with a fixed paraphilia.`,
        reflectionPause: "Notice what you feel as common explanations are ruled out. Does the absence of a simple cause feel unsettling? The truth is often more complex — and more demanding — than simple narratives suggest.",
        discussionQuestions: [
          "Why is it important to understand what did NOT cause the crisis, as well as what did?",
          "How do simplistic explanations (blaming celibacy, blaming homosexuality) actually hinder the Church's ability to address the real causes?",
        ],
      },
      {
        title: "What the Studies Identified",
        content: `The Causes and Context study identified a constellation of interrelated factors — a portrait not of a single sin but of a systemic collapse in formation, accountability, and the understanding of the human person:

Inadequate human formation: The majority of abusing priests were trained before the 1970s in environments that provided rigorous spiritual and intellectual formation but virtually no education in self-understanding, emotional competence, or preparation for the practical demands of celibate chastity.

Psychosexual immaturity: Many abusers exhibited confused sexual identities, poor emotional coping, difficulty forming adult relationships, and unresolved adolescent conflicts.

Social and cultural upheaval: The rise in abuse incidents during the 1960s and 1970s was consistent with broader societal increases in crime, drug use, divorce, and premarital sexual behavior. The sexual revolution intersected with the personal vulnerabilities of individual priests.

Situational factors and opportunity: Access to minors, unsupervised settings, and positions of trust facilitated abuse. Abusers frequently employed grooming tactics — gifts, special attention, emotional manipulation — to gain compliance from victims.

Institutional failures: The initial response of many bishops was to seek treatment for abusing priests rather than to protect victims or remove offenders. Accountability measures were not universal until after the Dallas Charter of 2002.

Histories of personal victimization: Priests who had themselves been sexually abused as minors were at significantly elevated risk of later offending, with rates ranging from 17 to 37 percent.

In the Agony in the Garden — the first Sorrowful Mystery — Christ foresaw every sin that would be committed in His name, and He sweated blood. The data of the John Jay studies is a participation in that agony. We must not look away. Like Christ in Gethsemane, we must drink this cup — not with despair, but with the resolve that leads to redemption.`,
        reflectionPause: "Which of these factors surprises you? Which makes you uncomfortable? The discomfort itself is data — it may reveal assumptions you held that the evidence does not support.",
        discussionQuestions: [
          "The study found that \"inadequate human formation\" was a central factor. What does this tell us about the importance of the kind of formation this program provides?",
          "How do situational factors (access, unsupervised settings, positions of trust) apply to your own ministry context? What opportunities for abuse exist that you may not have considered?",
        ],
      },
      {
        title: "The Critical Finding: Human Formation Works",
        content: `Perhaps the most consequential finding is that the development and implementation of human formation curricula in seminaries is directly associated with the sustained decline in abuse. As seminaries began to address psychosexual maturity, emotional intelligence, relational health, and the integrated living of celibate chastity, the incidence of abuse dropped dramatically and has remained low.

This is the moment where the Fall begins to point toward hope. The Book of Exodus tells the story of a people enslaved who cry out for deliverance — and God hears them. The Church cried out in the agony of the abuse crisis, and the answer has begun to emerge: formation of the whole person, grounded in the truth about human nature and human sexuality, is the most effective long-term strategy for preventing abuse. The question is whether the Church will embrace this answer fully — not only in seminaries, but in every parish, school, and ministry.`,
        reflectionPause: "Formation works. This is not a slogan — it is an empirical finding. What does it mean for you, personally, that you are undergoing formation right now? What is God forming in you through this process?",
        discussionQuestions: [
          "If human formation is the key factor in the decline of abuse, why should it be limited to seminarians? How can parishes extend this formation to all who serve?",
          "What would it look like for your community to take human formation as seriously as compliance training?",
        ],
      },
    ],
    lectio: {
      text: "Have mercy on me, O God, according to your steadfast love; according to your abundant mercy blot out my transgressions. Wash me thoroughly from my iniquity, and cleanse me from my sin.",
      ref: "Psalm 51:1-2",
      prompts: [
        "Read slowly. Let the weight of these words settle into your heart.",
        "Place yourself in the posture of the Church confronting the abuse crisis. What do you feel?",
        "What is God saying to you about truth, repentance, and the courage to confront evil?",
        "Rest in silence. Allow God's mercy to meet the grief and anger you may carry.",
      ],
    },
    reflection: "The John Jay studies are the Church's examination of conscience. As you sit with this data, resist the temptation to look away or to rush toward solutions. What movements do you notice in your own heart — grief, anger, confusion, resolve? Bring these honestly before God.",
  },

  {
    id: "formation",
    num: "III",
    title: "The Formation of a Holy People",
    latin: "Formatio Populi Sancti",
    subtitle: "Connecting Data to Doctrine",
    tagline: "God does not abandon His people after the Fall. He forms them through law, covenant, and prophetic witness.",
    Icon: Hexagon,
    color: "#4A7C59",
    meditation: {
      wound: { label: "The Wound", value: "The Left Foot — planted on the earth; theology grounded in reality" },
      sense: { label: "The Sense", value: "Hearing — \"Hear, O Israel\" (Deuteronomy 6:4)" },
      mystery: { label: "The Mystery", value: "The Proclamation of the Kingdom — Christ teaches, forming hearts and minds" },
      precept: { label: "The Precept", value: "Receive the Eucharist during Easter season — the Body given in love, not taken by force" },
      pentateuch: { label: "The Book", value: "Leviticus — the holiness code; the ordering of a people set apart" },
    },
    scripture: { text: "You shall be holy, for I the Lord your God am holy.", ref: "Leviticus 19:2" },
    introduction: `After the Fall, God does not abandon humanity. He begins the long, patient work of forming a holy people — through the covenant with Abraham, the Law given to Moses, and the prophets who called Israel back to fidelity. Leviticus contains the holiness codes: detailed instructions for how a people set apart for God are to live. These were not arbitrary rules. They were the pedagogy of a loving Father teaching His children to distinguish the holy from the profane, the clean from the unclean.

In our context, this part of the Drama corresponds to connecting the empirical findings of the John Jay studies to the theological principles that explain them and point the way forward. The sense associated with this stage is hearing: "Hear, O Israel!" God forms His people first by teaching them to listen — to His voice, to the truth, to the cry of the vulnerable.`,
    sections: [
      {
        title: "The Convergence of Data and Doctrine",
        content: `The strength of this guide lies in the convergence between empirical findings and theological truth. The John Jay studies documented what happened; the Theology of the Body and Humanae Vitae explain why it happened and how to prevent it.

Each finding of the John Jay studies has a corresponding theological principle and a formation implication. Inadequate human formation points to the need to integrate body and soul in formation. Psychosexual immaturity reveals the distortion of concupiscence that requires self-knowledge and grace. The objectification of victims through grooming contradicts the nuptial meaning of every person. The cultural upheaval that lowered moral norms confirms Paul VI's warnings about separating sexuality from meaning. The inadequate living of celibacy shows that self-mastery is the condition of self-gift. Institutional failures reveal that silence before evil is complicity. And the correlation between human formation and declining abuse confirms that grace builds on nature — that formation integrating truth, virtue, and the sacramental life is the path forward.`,
        reflectionPause: "As you consider these convergences, which one strikes you most powerfully? Where do you see the theological principle most clearly illuminating the empirical finding?",
        discussionQuestions: [
          "How does connecting the John Jay data to the Theology of the Body change the way you understand the abuse crisis — from a problem of bad individuals to a crisis of formation?",
          "Which convergence between data and doctrine is most relevant to your own ministry context?",
        ],
      },
      {
        title: "The Prophetic Warnings of Humanae Vitae",
        content: `In 1968, Paul VI predicted that the widespread separation of sexuality from its procreative dimension would lead to: a general lowering of moral standards; increased infidelity; a loss of respect for persons reduced to instruments of enjoyment; and the abuse of governmental power in the realm of reproduction. Each prediction has been borne out.

The third prediction is most illuminating here. Paul VI warned that when the body's life-giving capacity is suppressed, the person is at risk of being treated as an object. The cultural revolution of the 1960s and 1970s — precisely when abuse incidents peaked — was characterized by exactly this reductive view of sexuality. The convergence of Paul VI's prophetic warning and the John Jay timeline is confirmatory.

The third Precept — receiving the Eucharist during the Easter season — points to the remedy. The Eucharist is the Body given in love, freely and completely. It is the antithesis of abuse. Regular encounter with Christ's Eucharistic self-gift is the ongoing formation of a people who know the difference between love and exploitation.`,
        reflectionPause: "Paul VI wrote Humanae Vitae in 1968 — the very year the abuse crisis was accelerating. His warnings were dismissed by many at the time. What does it mean that the data now confirms what the Church's teaching predicted?",
        discussionQuestions: [
          "How does the Eucharist — the Body given in love — serve as the antithesis of abuse and the ongoing formation of a people who know the difference between love and exploitation?",
          "Where in our culture today do you see Paul VI's predictions continuing to unfold?",
        ],
      },
      {
        title: "Concupiscence: The Theological Name for What the Data Describes",
        content: `The psychological profiles in the John Jay studies — intimacy deficits, emotional congruence with adolescents, confused sexual identities, poor self-regulation — have a theological name: concupiscence. John Paul II described concupiscence not simply as strong sexual desire but as a reductive way of seeing another person that strips away their dignity and reduces them to an instrument of use.

The abusing priests were men in whom concupiscence was never adequately understood, confronted, or redeemed through grace. Their formation addressed the intellect and the spirit but left the heart and the body largely untouched. The Theology of the Body provides the vocabulary and framework for the kind of formation that was missing — a formation that acknowledges disordered desire without despair, because it proclaims the possibility of redemption.

As the Luminous Mystery of the Proclamation of the Kingdom reminds us, Christ's first public act was to teach. And as Leviticus insists with its meticulous holiness codes, the formation of a holy people is not abstract; it is concrete, practical, and demanding. It reaches into every dimension of life — including sexuality, relationships, and the governance of desire.`,
        reflectionPause: "Concupiscence is not someone else's problem. It is the human condition after the Fall. Where in your own life do you recognize the tendency to see another person as less than fully human — as a means to an end, an annoyance, an object?",
        discussionQuestions: [
          "How does giving a theological name (concupiscence) to psychological observations (intimacy deficits, poor self-regulation) change the way we approach prevention?",
          "What 'holiness codes' does your community need — not arbitrary rules, but practices that protect the sacred dignity of every person?",
        ],
      },
    ],
    // Interactive convergence table data
    convergenceTable: [
      { finding: "Inadequate human formation in seminaries prior to the 1970s", principle: "The body reveals the person; formation must integrate body and soul (TOB)", implication: "Address the whole person: spiritual, intellectual, emotional, and psychosexual dimensions" },
      { finding: "Psychosexual immaturity and confused sexual identity among abusers", principle: "Concupiscence distorts the language of the body; redemption requires self-knowledge and grace (TOB)", implication: "Honest formation in understanding one's own desires, temptations, and the path to interior freedom" },
      { finding: "Abusers treated victims as objects via grooming and manipulation", principle: "Every person has a nuptial meaning; to use another as an object contradicts their God-given dignity (TOB/HV)", implication: "Cultivate the capacity to see every person as a subject of dignity, never a means to an end" },
      { finding: "Cultural upheaval of the 1960s–1970s lowered moral norms", principle: "Separating sexuality from its true meaning leads to moral degradation (HV)", implication: "Form people to resist cultural pressures through deep understanding of the truth about sexuality" },
      { finding: "Celibacy was inadequately lived, not inadequately required", principle: "Self-mastery is the condition of self-gift; celibacy requires ongoing interior freedom (TOB)", implication: "Prepare for celibacy as a positive vocation of love, not merely abstinence" },
      { finding: "Institutional failures in oversight and accountability", principle: "Truth and love require courage; silence before evil is complicity", implication: "Create structures of accountability, transparency, and fraternal correction rooted in charity" },
      { finding: "Human formation correlates with sustained decline in abuse", principle: "Grace builds on nature; formation integrates truth, virtue, and sacramental life", implication: "Ongoing formation for all — not just seminarians — is essential for a culture of protection" },
    ],
    lectio: {
      text: "Hear, O Israel: The Lord our God, the Lord is one. You shall love the Lord your God with all your heart and with all your soul and with all your might.",
      ref: "Deuteronomy 6:4-5",
      prompts: [
        "Read slowly. What does it mean to love God with ALL your heart — not a divided heart?",
        "Consider the word 'hear.' The formation of a holy people begins with listening. What has been hard to hear in this training?",
        "What is God forming in you through this process? What is He asking you to receive?",
        "Rest in the knowledge that God's formation is an act of love, not punishment.",
      ],
    },
    reflection: "God forms His people through law, covenant, and prophetic witness. Consider: What 'holiness codes' does your community need — not arbitrary rules, but practices that protect the sacred dignity of every person? What would it look like for your parish to be 'set apart' in its commitment to protecting the vulnerable?",
  },

  {
    id: "messiah",
    num: "IV",
    title: "The Messiah",
    latin: "Messias",
    subtitle: "The Redemption of the Body",
    tagline: "In Christ, the wounds of humanity become the wounds of God — and through those wounds, we are healed.",
    Icon: Cross,
    color: "#9B2335",
    meditation: {
      wound: { label: "The Wound", value: "The Right Foot — stepping forward; from diagnosis to healing" },
      sense: { label: "The Sense", value: "Smell — the fragrance of Christ's sacrifice (2 Corinthians 2:15)" },
      mystery: { label: "The Mystery", value: "The Crucifixion — the wounds that redeem; the body given completely" },
      precept: { label: "The Precept", value: "Observe days of fasting and abstinence — bodily discipline as the school of self-mastery" },
      pentateuch: { label: "The Book", value: "Numbers — the wilderness journey; purification before the promised land" },
    },
    scripture: { text: "By his wounds we are healed.", ref: "Isaiah 53:5" },
    introduction: `At the center of the Drama of Salvation stands the Cross. The Messiah does not come to explain suffering from a distance; He enters into it. He assumes a human body and allows that body to be broken. And in the breaking, something new is made possible: redemption. The five wounds of Christ — hands, feet, and side — are not merely historical injuries. They are the permanent marks of a love that absorbs the worst of human sin and transforms it from within.

This is the theological heart of our guide. The abuse crisis inflicted wounds on the Body of Christ — on victims, on the faithful, on the priesthood, on the Church's mission. But the Christian proclamation is that wounds can become the site of healing, because Christ has gone before us into the deepest darkness and emerged alive. Where corruption produces a stench, holiness produces a fragrance — the sense of smell, associated with this part. Scripture speaks of Christians as the aroma of Christ in the world. The question before the Church is whether she will allow Christ's redemptive work to transform the stench of scandal into the fragrance of authentic conversion.`,
    sections: [
      {
        title: "Christ Reveals Man to Himself",
        content: `The Second Vatican Council declared that Christ fully reveals man to man himself and makes his supreme calling clear. This text from Gaudium et Spes is the Christological key to the entire Theology of the Body. We do not know who we are by looking at ourselves alone; we know who we are by looking at Christ. And what Christ reveals is that the human person is made for self-gift — that the body reaches its highest meaning in being given away in love.

The Cross is the supreme expression of this truth. Christ says with His body on Calvary what every human being is called to say: "This is my body, given for you." The priest who pronounces these words at the altar is called to live them in every dimension of his life. The abusing priest spoke a counter-word: "This is your body, taken for me." The contrast could not be more absolute.`,
        reflectionPause: "\"This is my body, given for you\" versus \"This is your body, taken for me.\" Sit with this contrast. Which word does your life speak?",
        discussionQuestions: [
          "How does looking at Christ on the Cross reveal the truth about what the human person is made for?",
          "What does it mean that a priest pronounces 'This is my body, given for you' at the altar but an abusing priest spoke the opposite with his actions?",
        ],
      },
      {
        title: "The Redemption of the Body Is Real",
        content: `John Paul II was emphatic that the Christian call is not to suppress desire but to transform it through the redemption of the body. This transformation is real and possible — not a matter of gritting one's teeth, but of allowing grace to progressively reorder the interior life so that the capacity for genuine love grows and the power of concupiscence diminishes.

The means of this transformation are the ordinary resources of the Christian life: the sacraments (especially the Eucharist and Confession), spiritual direction, ascetical practices, authentic friendship, genuine community, ongoing intellectual formation, and honest self-knowledge.

The fourth Precept — observing days of fasting and abstinence — points to a truth the crisis painfully confirmed: bodily discipline is not an archaism. It is the school of self-mastery. A person who has never learned to say no to a legitimate appetite will be poorly equipped to say no to an illegitimate one.

The Book of Numbers recounts Israel's wilderness journey — forty years of purification before the promised land. The Church is on her own wilderness journey. This journey is painful, but it is not aimless. It is a purification ordered toward renewed fidelity, deeper holiness, and more credible witness.`,
        reflectionPause: "The redemption of the body is real. Do you believe this — not as an abstract doctrine, but as a lived reality? Where in your own life do you need the redemptive power of Christ to transform disordered desire into authentic love?",
        discussionQuestions: [
          "Why is bodily discipline (fasting, abstinence) important for the life of self-mastery? How has the neglect of these practices contributed to the crisis?",
          "What 'wilderness journey' is the Church on right now? What does faithful perseverance look like in this season?",
        ],
      },
      {
        title: "The Five Wounds and the Healing of the Church",
        content: `Each wound of Christ corresponds to a dimension of the Church's healing:

The wound of the right hand: The hand that creates and blesses. The Church must recover her creative mission — forming men and women who understand the body's meaning and live it with integrity. Formation is an act of creation.

The wound of the left hand: The hand that receives. The Church must learn to receive the truth about herself — the testimony of victims, the findings of researchers, the critiques of those who love her enough to speak honestly. Humility is the beginning of healing.

The wound of the right foot: The foot that steps forward. The Church must move from diagnosis to action — implementing the formation, the accountability, and the structural changes that the data demands.

The wound of the left foot: The foot planted on the ground. The Church must remain grounded in reality — in the concrete, measurable, verifiable practices of protection, rather than retreating into abstract assurances.

The wound of the side: From Christ's pierced side flowed blood and water — the Eucharist and Baptism, the sacraments that constitute the Church. The ultimate healing will come not from programs alone, but from the sacramental life that flows from the heart of the crucified and risen Lord.`,
        reflectionPause: "Consider each wound slowly. Which dimension of healing does your community most need right now? The creativity of the right hand? The humility of the left? The courage to step forward? The groundedness to stay planted? The sacramental life that flows from the side?",
        discussionQuestions: [
          "Which of the five wounds speaks most directly to your parish or community's situation right now?",
          "How can we hold together the need for concrete, measurable practices (the left foot) with the need for sacramental healing (the side)?",
        ],
      },
      {
        title: "Chastity as Integration, Not Mere Abstinence",
        content: `The virtue of chastity, properly understood, is the integration of sexuality within the person — the interior ordering of desire so that one is free to love authentically. Chastity is not merely the absence of sexual activity; it is the positive capacity to see and treat every person according to their true dignity. It is lived differently in different vocations — in marriage through faithful, fruitful self-giving; in celibacy through spiritual fatherhood or motherhood — but in every case it requires the ongoing work of self-mastery made possible by grace.

The fragrance of a chaste life is discernible. Communities where chastity is lived authentically have a quality of freedom, joy, transparency, and mutual respect. Communities where it is not have secrecy, anxiety, clericalism, and the subtle power dynamics that enable abuse. Formation in chastity is therefore not merely personal; it is communal. It shapes the culture of a parish, a seminary, a diocese.`,
        reflectionPause: "The fragrance of a chaste community is discernible. Think about your own parish or community. What is its \"fragrance\"? Freedom and joy — or secrecy and anxiety? What would need to change?",
        discussionQuestions: [
          "How does understanding chastity as 'integration' rather than 'abstinence' change the way we talk about it — especially with young people?",
          "What does a 'chaste community' look like in practice? What are its characteristics?",
        ],
      },
    ],
    // Five Wounds walkthrough data
    fiveWounds: [
      { wound: "The Right Hand", meaning: "The hand that creates and blesses", healing: "The Church must recover her creative mission — forming men and women who understand the body's meaning and live it with integrity." },
      { wound: "The Left Hand", meaning: "The hand that receives", healing: "The Church must learn to receive the truth about herself — the testimony of victims, the findings of researchers, the critiques of those who love her." },
      { wound: "The Right Foot", meaning: "The foot that steps forward", healing: "The Church must move from diagnosis to action — implementing formation, accountability, and structural changes." },
      { wound: "The Left Foot", meaning: "The foot planted on the ground", healing: "The Church must remain grounded in concrete, measurable, verifiable practices of protection." },
      { wound: "The Side", meaning: "From which flowed blood and water", healing: "The ultimate healing comes from the sacramental life that flows from the heart of the crucified and risen Lord." },
    ],
    lectio: {
      text: "He was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.",
      ref: "Isaiah 53:5",
      prompts: [
        "Read slowly. Let each wound of Christ become present to you.",
        "Consider the victims of abuse. Place their wounds alongside Christ's wounds. What do you see?",
        "What healing does Christ offer to the Church through His own brokenness?",
        "Rest in the mystery: the Wounded Healer. What does He say to you?",
      ],
    },
    reflection: "The redemption of the body is real. Do you believe this — not as an abstract doctrine, but as a lived reality? Where in your own life do you need the redemptive power of Christ to transform disordered desire into authentic love?",
  },

  {
    id: "church",
    num: "V",
    title: "The Church",
    latin: "Ecclesia",
    subtitle: "Implementation and the Mission Going Forward",
    tagline: "From the wounded side of Christ flows the Church — sent into the world to continue His mission.",
    Icon: Church,
    color: "#2E5E8E",
    meditation: {
      wound: { label: "The Wound", value: "The Side (Heart) — from which flowed blood and water: the Church herself" },
      sense: { label: "The Sense", value: "Touch — now we act, we build, we serve" },
      mystery: { label: "The Mystery", value: "The Descent of the Holy Spirit — the Church is empowered for her mission" },
      precept: { label: "The Precept", value: "Provide for the needs of the Church — every member supports the mission of protection" },
      pentateuch: { label: "The Book", value: "Deuteronomy — the covenant renewed before entering the promised land" },
    },
    scripture: { text: "You will receive power when the Holy Spirit has come upon you, and you will be my witnesses.", ref: "Acts 1:8" },
    introduction: `The Drama of Salvation does not end at Calvary. It continues in the Church, the Body of Christ in the world — wounded, yes, but risen and alive, empowered by the Holy Spirit. Deuteronomy, the last book of the Pentateuch, is Moses' great renewal of the covenant before Israel crosses into the promised land. It is both a look backward and a charge forward: remember what God has done, and now go and live accordingly.

This is the posture of Part V. The Church has examined her conscience (Part II), recovered her foundational vision (Part I), connected data to doctrine (Part III), and encountered the redemptive power of Christ's wounds (Part IV). Now she must act. The sense associated with this stage is touch — the most concrete of the senses, the one most relevant to safeguarding. Now we lay hands on the work. The Descent of the Holy Spirit at Pentecost empowers the Church for exactly this mission. And the fifth Precept — providing for the needs of the Church — reminds every member that the mission of protection belongs to all of us.`,
    sections: [
      {
        title: "Structures of Protection",
        content: `A culture of protection is more than policies; it is a community ethos rooted in the truth about the human person. It includes:

Physical environment standards: Two-adult rule for all interactions with minors. Open-door policies. Windows in all meeting rooms. No private electronic communication between adults and unrelated minors. Transportation and overnight event protocols.

Transparency and accountability: Regular compliance audits. Parish safe environment coordinators. Open channels for reporting concerns. A culture where questions and concerns are welcomed, not punished.

Ongoing formation: Annual refresher training. Integration of Theology of the Body principles into religious education, sacramental preparation, RCIA, marriage preparation, and clergy continuing education.`,
        reflectionPause: "Which of these structures is already in place in your community? Which is missing? Which exists on paper but is not consistently practiced?",
        discussionQuestions: [
          "What is the difference between a policy that exists on paper and a culture that lives in practice? How do we bridge that gap?",
          "Which of these structures would be most difficult to implement in your community? Why? What resistance would you expect?",
        ],
      },
      {
        title: "Support and Healing",
        content: `Recognizing that isolation is a risk factor, parishes and dioceses should actively promote healthy community life among clergy, religious, teachers, and volunteers. This includes regular opportunities for fraternal fellowship, access to spiritual direction, encouragement of appropriate friendships, and early intervention when signs of distress or isolation appear.

Caring for survivors: Any culture of protection must include a genuine, sustained commitment to caring for those who have been harmed. This means accessible and compassionate victim assistance, support for counseling and healing, respect for the legal process, and a willingness to listen without defensiveness. The Church's credibility in this area depends entirely on her sincerity in caring for those who have been wounded.

The Descent of the Holy Spirit at Pentecost empowers the Church for exactly this kind of mission. And the fifth Precept — providing for the needs of the Church — reminds every member of the faithful that the mission of protection is not the responsibility of professionals alone. It belongs to all of us.`,
        reflectionPause: "Who in your community might be isolated right now — a priest living alone, a volunteer with no close friendships, a teacher under unusual stress? What could you do this week to reach out?",
        discussionQuestions: [
          "How does your community care for survivors? Is there a victim assistance coordinator? Do people know how to access help?",
          "What concrete action will you take this week to make your community safer, more transparent, and more faithful to the truth about the human person?",
        ],
      },
    ],
    lectio: {
      text: "And they devoted themselves to the apostles' teaching and the fellowship, to the breaking of bread and the prayers.",
      ref: "Acts 2:42",
      prompts: [
        "Read slowly. Notice the four pillars: teaching, fellowship, Eucharist, prayer.",
        "How does your community embody — or fail to embody — each of these pillars?",
        "What would your parish look like if it truly lived as the early Church described here?",
        "Rest in the presence of the Holy Spirit who empowers the Church for her mission.",
      ],
    },
    reflection: "You are being sent. From this formation, you go forth as a member of the Body of Christ, commissioned to protect, to serve, and to witness. What concrete action will you take this week to make your community safer, more transparent, and more faithful to the truth about the human person?",
  },
];

// ─── MODULES: Full content with Lectio Divina, expanded scenarios, discussion questions ───

export const MODULES = [
  {
    day: 1, title: "Light", latin: "Lux",
    subtitle: "The Truth About the Human Person",
    verse: "And God said, 'Let there be light,' and there was light. And God separated the light from the darkness.",
    ref: "Genesis 1:3-4",
    Icon: Sun,
    intro: `On the first day, God's first act is to create light and to separate it from darkness. Before anything else can be made, there must be the capacity to see. This module is the "light" of the entire program: the foundational act of discernment that enables us to distinguish truth from falsehood about who the human person is. Without this light, all subsequent efforts at protection operate in the dark.`,
    content: [
      "Genesis 1:26–27: Created in the image and likeness of God. Every human being — especially the most vulnerable — possesses inviolable worth. This is the light that must shine on everything that follows.",
      "Genesis 2:18: \"It is not good for man to be alone.\" The person is created for communion. Isolation and loneliness are risk factors identified by the John Jay studies; they are also, theologically, forms of darkness — the absence of the relational light for which we were made.",
      "The body-soul unity: We do not merely have bodies; we are our bodies. Actions performed upon the body are actions performed upon the person. To see this clearly is to have the light of Day One.",
      "Gaudium et Spes 24: The human person discovers his true self only in a sincere gift of self. This is the \"law of the gift\" — the deepest truth about human nature, now brought into the light.",
    ],
    discussionQuestions: [
      "How does the view that \"the body reveals the person\" change how we understand physical boundaries with children and vulnerable persons?",
      "The John Jay studies found that abusers exhibited intimacy deficits. How does the principle that we are made for communion illuminate this finding?",
      "What practical steps can our community take to ensure no one in ministry is left in the \"darkness\" of isolation?",
    ],
    scenarios: [
      {
        title: "The Mentor",
        text: "A new volunteer coach begins spending extra time after practice with a 13-year-old whose parents are going through a divorce. He drives the boy home, buys him gifts, and texts him regularly. Other volunteers notice but assume it's just mentoring. What signs should alert you? What interior movements do you notice as you consider this situation — reluctance to 'make trouble,' desire to give benefit of the doubt, concern for the child?",
      },
    ],
    lectio: {
      text: "The people who walked in darkness have seen a great light; those who dwelt in a land of deep darkness, on them has light shone.",
      ref: "Isaiah 9:2",
      prompts: [
        "Read slowly. What darkness in the Church is this light meant to dispel?",
        "Where have you walked in darkness — failing to see a person's dignity, failing to see a warning sign?",
        "What light is God offering you through this formation?",
        "Rest in the light. Let it illuminate what needs to be seen.",
      ],
    },
    examen: "Where today did I see the image of God in another person? Where did I fail to see it? Where was I tempted to treat someone as less than fully human?",
  },
  {
    day: 2, title: "The Firmament", latin: "Firmamentum",
    subtitle: "The Language of the Body and the Meaning of Sexuality",
    verse: "And God said, 'Let there be a firmament in the midst of the waters, and let it separate the waters from the waters.'",
    ref: "Genesis 1:6",
    Icon: Circle,
    intro: `On the second day, God creates the firmament — a structure that separates and orders the waters. This is the day of boundaries, of distinction, of divinely established order. The firmament is not a restriction; it is what makes the rest of creation possible. In the same way, the meaning inscribed in human sexuality — its ordering toward self-giving love, union, and life — is not a set of arbitrary rules. It is the God-given structure that makes authentic love possible. When this structure is violated, the result is chaos — the return of the formless waters.`,
    content: [
      "The nuptial meaning of the body: The human body is a sign and instrument of self-giving love, in both marriage and celibacy. This meaning is the \"firmament\" of human sexuality — the structure that gives it order and purpose.",
      "The inseparable connection (Humanae Vitae 12): Sexuality is ordered toward both union and life. When these dimensions are deliberately separated, the firmament is breached. Abuse is the most catastrophic form of this breach.",
      "The language of the body can be spoken truthfully or falsely. Every act of abuse speaks a profound lie — it says \"I have the right to use you\" when the truth of the firmament declares \"you are a person of sacred dignity whom I am called to protect.\"",
      "Paul VI's prophetic warnings: The separation of sexuality from its integral meaning leads to the dissolution of the moral firmament — a general lowering of standards, loss of respect for persons, and the conditions in which the abuse crisis emerged.",
    ],
    discussionQuestions: [
      "How does understanding sexuality as having a God-given \"structure\" (like the firmament) change how we think about boundaries in ministry?",
      "Paul VI predicted that separating sexuality from its full meaning would lead to a loss of respect for persons. How have we seen this in our culture? In the Church?",
      "What does it mean practically for a celibate person to honor the \"firmament\" — the God-given structure — of sexuality?",
    ],
    scenarios: [
      {
        title: "The Affectionate Pastor",
        text: "A priest in your parish is beloved for his warmth with young people. He frequently hugs teenagers, ruffles their hair, and has them sit close to him during counseling. Some parents express mild discomfort but are told 'Father is just affectionate.' Consider: What does the 'firmament' — the God-given structure of appropriate boundaries — look like here? What interior movements arise as you weigh 'He means well' against the discomfort?",
      },
    ],
    lectio: {
      text: "For everything there is a season, and a time for every matter under heaven. He has made everything beautiful in its time.",
      ref: "Ecclesiastes 3:1, 11",
      prompts: [
        "Read slowly. God creates order, seasons, structure. What does this tell you about boundaries?",
        "Where in your ministry have boundaries felt like restrictions rather than gifts? Can you see them differently now?",
        "What is God saying to you about the beauty of order — about the firmament He has placed in human relationships?",
        "Rest in the knowledge that God's boundaries are acts of love.",
      ],
    },
    examen: "Where in my life do I honor the God-given structure of relationships? Where have I been careless with boundaries — physical, emotional, or digital? Where have I witnessed boundary violations and remained silent?",
  },
  {
    day: 3, title: "Dry Land and Vegetation", latin: "Terra et Herba",
    subtitle: "Concupiscence, Self-Mastery, and the Life of Grace",
    verse: "And God said, 'Let the waters be gathered, and let the dry land appear.' … And the earth brought forth vegetation.",
    ref: "Genesis 1:9, 12",
    Icon: Leaf,
    intro: `On the third day, the chaotic waters are gathered and constrained so that dry land can appear — and from the dry land, vegetation springs forth and bears fruit. This is the day of self-mastery and fruitfulness. The waters of disordered desire (concupiscence) must be gathered and ordered before the soul can bear fruit. A person who is submerged in unexamined, ungoverned desire — like land still covered by the flood — cannot produce the fruit of authentic love. Self-mastery is the gathering of the waters; virtue is the vegetation that follows.`,
    content: [
      "Matthew 5:27–28 and the reality of adultery in the heart. Concupiscence is the tendency to reduce another person to an object of use. It affects every person after the Fall — the chaotic waters that must be ordered.",
      "The John Jay finding that abusers exhibited poor self-regulation, substance abuse, and emotional coping deficits. These are manifestations of ungathered waters — concupiscence that was never confronted or ordered through grace.",
      "Self-mastery is not repression. John Paul II was emphatic: the Christian call is not to dam up desire but to channel it — to gather the waters so that the dry land of the soul can appear and bear fruit. This transformation is real and possible through the sacraments, spiritual direction, ascetical practice, authentic friendship, and honest self-knowledge.",
      "Chastity as integration: the interior ordering of desire so that one is free to love authentically. Chastity is not barrenness; it is the condition for fruitfulness — the dry land from which the tree of life grows.",
      "Warning signs that the waters are rising: persistent isolation, secretive behavior, escalating boundary violations, substance abuse, rationalization of inappropriate conduct, and resistance to accountability.",
    ],
    discussionQuestions: [
      "How does the image of \"gathering the waters\" change how we think about the relationship between self-mastery and fruitfulness?",
      "What role do the sacraments, spiritual direction, and authentic friendship play in \"ordering the waters\" of desire?",
      "What practical mechanisms can our community establish to recognize when the \"waters are rising\" in someone's life?",
    ],
    scenarios: [
      {
        title: "The Withdrawn Teacher",
        text: "A teacher at your parish school has become withdrawn over several months. She's drinking more at social events, has stopped attending spiritual direction, and recently made a comment about a student that struck you as oddly personal. Nothing 'concrete' has happened. What do the 'rising waters' look like in this situation? What is your responsibility? Notice your interior resistance to getting involved.",
      },
    ],
    lectio: {
      text: "Blessed is the man who walks not in the counsel of the wicked, nor stands in the way of sinners, nor sits in the seat of scoffers; but his delight is in the law of the Lord. He is like a tree planted by streams of water that yields its fruit in its season.",
      ref: "Psalm 1:1-3",
      prompts: [
        "Read slowly. Notice the image: a tree planted by water, bearing fruit in season.",
        "What are the 'streams of water' in your life that nourish fruitfulness? What are the 'chaotic waters' that threaten to overwhelm?",
        "What is God saying to you about self-mastery as the condition for bearing fruit?",
        "Rest in the image of the fruitful tree. Ask God to order the waters of your own desires.",
      ],
    },
    examen: "Where are the 'waters rising' in my own life — where is desire ungoverned, where am I losing self-mastery? What practices of prayer, sacrament, and community am I neglecting? Where do I need to ask for help?",
  },
  {
    day: 4, title: "Lights to Govern", latin: "Luminaria",
    subtitle: "Recognizing, Responding, and Reporting",
    verse: "And God said, 'Let there be lights in the firmament of the heavens to separate day from night, and let them be for signs.'",
    ref: "Genesis 1:14",
    Icon: Star,
    intro: `On the fourth day, God places the sun, moon, and stars in the firmament to govern day and night and to serve as signs. This is the day of governance, vigilance, and the reading of signs. The heavenly bodies do not create the light (that was Day One); they organize and direct it so that life on earth can be sustained. In the same way, this module does not create the theological vision (that was Modules 1–3); it provides the practical systems of oversight, the signs we must learn to read, and the structures of governance that illuminate what would otherwise remain hidden in darkness.`,
    content: [
      "Grooming behaviors as \"signs\" to read: How abusers systematically build trust, isolate victims, and create conditions for abuse. The John Jay studies documented that abusers frequently used gifts, special attention, and emotional manipulation. These are the signs the fourth-day lights must reveal.",
      "Warning signs in adults: Boundary violations that progress gradually, special relationships with individual minors, secretive communication, providing alcohol or inappropriate materials, circumventing safety protocols, and resistance to oversight. These are patterns — like the seasons marked by the heavenly bodies — that can be learned and recognized.",
      "Warning signs in children: Behavioral changes, withdrawal, age-inappropriate sexual knowledge, fear of specific adults, reluctance to be alone with a particular person, and physical indicators.",
      "Responding to disclosures: Believe the child. Remain calm. Do not investigate independently. Document what was said. Report immediately to both civil authorities (law enforcement or child protective services) and the diocesan victim assistance coordinator.",
      "Mandatory reporting obligations under applicable state law. In many jurisdictions, failure to report is a crime. The \"lights to govern\" include the structures of civil law that serve justice.",
      "Theological grounding of reporting: Reporting is not a betrayal; it is an act of justice and charity toward the victim, the community, and even the accused. Silence in the face of known or suspected abuse is the darkness that the fourth-day lights are meant to dispel.",
    ],
    discussionQuestions: [
      "What makes it difficult to report concerns about someone you know and trust? What interior movements (fear, loyalty, doubt) might prevent you from acting?",
      "How does understanding reporting as an act of charity — not betrayal — change your willingness to act?",
      "What systems are in place in your parish for reporting concerns? Do all staff and volunteers know how to use them?",
    ],
    scenarios: [
      {
        title: "The Escalating Boundary",
        text: "Over six months, you've noticed a deacon in your parish gradually increasing physical contact with altar servers. It started with pats on the back, progressed to arm-around-the-shoulder, and last week you saw him with his hand on a boy's knee during a conversation. Each incident alone seems minor. But you notice a pattern. Walk through exactly what you do. Notice the voices in your head: 'It's probably nothing,' 'I don't want to ruin his reputation,' 'What if I'm wrong?' These are the movements to examine.",
      },
      {
        title: "The Child's Disclosure",
        text: "A 9-year-old in your religious education class draws a picture that disturbs you — it seems to depict an adult touching a child. When you gently ask about it, the child becomes anxious and says 'I'm not supposed to tell.' Walk through exactly what you do next. Notice: What is your heart rate doing? What thoughts arise — 'Maybe I'm overreacting,' 'This will cause so much trouble,' 'What if I'm wrong'?",
      },
      {
        title: "The Suspicious Colleague",
        text: "A fellow volunteer mentions to you privately that she's uncomfortable with how a longtime parish employee interacts with teenagers — lingering touches, inside jokes, texting individual kids. But she says, 'I'm sure it's fine, I just wanted to tell someone.' What do you do with this information? What is your obligation? Notice the temptation to minimize, to defer, to wait for 'something concrete.'",
      },
    ],
    lectio: {
      text: "Take no part in the unfruitful works of darkness, but instead expose them. For it is shameful even to speak of the things that they do in secret. But when anything is exposed by the light, it becomes visible.",
      ref: "Ephesians 5:11-13",
      prompts: [
        "Read slowly. Paul commands: expose the works of darkness. Not ignore them. Not minimize them. Expose them.",
        "Where have you been tempted to 'take part' in darkness through silence or inaction?",
        "What is God saying to you about your responsibility to be a 'light' — a sign — in your community?",
        "Rest in the knowledge that light overcomes darkness. Ask for courage.",
      ],
    },
    examen: "Where have I seen 'signs' and failed to read them? Where have I allowed the darkness of silence, convenience, or fear to prevent me from acting? What courage is God asking of me?",
  },
  {
    day: 5, title: "Teeming Life", latin: "Vita Abundans",
    subtitle: "Building a Culture of Protection",
    verse: "And God said, 'Let the waters bring forth swarms of living creatures.' … And God blessed them, saying, 'Be fruitful and multiply.'",
    ref: "Genesis 1:20, 22",
    Icon: Bird,
    intro: `On the fifth day, life multiplies abundantly — the seas teem, the skies fill, and God blesses the creatures with fruitfulness. This is not a cautious, minimal existence; it is an explosion of vitality. A culture of protection is not a sterile, fearful environment governed only by rules and suspicion. It is a community teeming with the life of grace — a place where children and the vulnerable can flourish, where relationships are healthy, where joy and trust are possible precisely because vigilance and accountability are present. The goal is not to restrict life but to create the conditions in which it can abound.`,
    content: [
      "Physical environment standards that create space for life to flourish safely: Two-adult rule for all interactions with minors, open-door policies, windows in meeting rooms, prohibition of private electronic communication between adults and unrelated minors, transportation and overnight event protocols.",
      "Transparency and accountability as the \"waters\" in which healthy life teems: Regular compliance audits, parish safe environment coordinators, open channels for reporting concerns, a culture where questions and concerns are welcomed rather than suppressed.",
      "Ongoing formation as the \"blessing of fruitfulness\": Annual refresher training, integration of Theology of the Body principles into religious education, sacramental preparation, RCIA, marriage preparation, and clergy continuing education. A community that regularly discusses the dignity of the person and the meaning of love will be a community where abuse cannot take root.",
      "Support structures for those in ministry: Recognizing that isolation is a risk factor (John Jay), parishes and dioceses should promote healthy community life among clergy, religious, teachers, and volunteers — fraternal fellowship, spiritual direction, appropriate friendships, and early intervention when signs of distress appear. Life teems in community, not in isolation.",
      "Caring for survivors: A teeming, life-giving community includes those who have been wounded. Accessible and compassionate victim assistance, support for counseling and healing, respect for the legal process, and a willingness to listen without defensiveness are essential to a truly life-giving culture.",
    ],
    discussionQuestions: [
      "What is the difference between a culture of compliance (sterile, rule-based, fearful) and a culture of protection (teeming with life, joy, trust, and accountability)?",
      "How can the theological vision of Parts I–IV inform the way we implement practical policies, so that they feel life-giving rather than merely restrictive?",
      "What structures of support exist in our community for those in ministry? Where is our community \"teeming,\" and where is it barren? What is lacking?",
    ],
    scenarios: [
      {
        title: "The Resistant Parish",
        text: "Your parish is implementing new safe environment policies. Some long-time volunteers are resistant: 'We've never had a problem here,' 'This makes it seem like we don't trust each other,' 'Father would never allow anything to happen.' How do you respond in a way that honors their feelings while insisting on the policies? How do you help them see that a 'teeming' culture of protection is life-giving, not restrictive?",
      },
    ],
    lectio: {
      text: "I came that they may have life and have it abundantly.",
      ref: "John 10:10",
      prompts: [
        "Read slowly. Christ came for abundant life — not minimal compliance, not fearful restriction, but abundance.",
        "Where does your community experience abundant life? Where does it feel constricted or fearful?",
        "What is God saying to you about the relationship between protection and flourishing?",
        "Rest in the promise of abundant life. Ask God to make your community teem with His grace.",
      ],
    },
    examen: "Is my community 'teeming with life' or operating in a mode of fearful compliance? What one thing could I do to help my parish become a place where both joy and accountability flourish? Where is our community barren, and why?",
  },
  {
    day: 6, title: "Man and Woman in the Image of God", latin: "Imago Dei",
    subtitle: "Living the Truth — A Vocation for All",
    verse: "Then God said, 'Let us make man in our image, after our likeness; and let them have dominion.' … And God saw everything that he had made, and behold, it was very good.",
    ref: "Genesis 1:26, 31",
    Icon: Crown,
    intro: `On the sixth day, God creates the crown of creation: man and woman, made in His own image and likeness, blessed with the vocation to be fruitful, to exercise stewardship, and to fill the earth with the goodness they have received. This is the day of vocation, of commissioning, of the full flowering of everything the previous five days have prepared. And God's verdict over the whole of creation — now complete — is not merely "good" but "very good."

This module calls every participant to embrace their vocation as image-bearers of God. The protection of the vulnerable is not a bureaucratic obligation; it flows from the deepest truth of who we are. To be made in the image of God is to be made for love — and love protects, defends, and serves.`,
    content: [
      "Every baptized person is called to protect the vulnerable. This flows from baptism itself and from the image of God inscribed in every human being. When one member of the Body suffers, all suffer (1 Corinthians 12:26). The sixth-day commission to exercise dominion is a commission to serve and protect, not to dominate or exploit.",
      "The Church's witness depends on integrity. The abuse crisis caused incalculable damage not only to victims but to the Church's ability to proclaim the Gospel. The credibility of her teaching on marriage, sexuality, and dignity is inseparable from her conduct. Every person who serves in the Church — ordained or lay — bears responsibility for this witness.",
      "Hope rooted in redemption. The Theology of the Body is ultimately a message of hope. The redemption of the body is real. Broken persons can be healed, disordered desires transformed, communities renewed. The sixth day is not the end — it leads to the Sabbath, to rest in God, to the Eucharistic communion that is the goal of all creation.",
      "Commitment: Each participant is invited to make a personal commitment to ongoing formation, to vigilance in protecting the vulnerable, and to living the truth about the human person in their own vocation — as priest, religious, teacher, parent, volunteer, or parishioner. This commitment is the human person's response to the sixth-day blessing: Be fruitful. Fill the earth with goodness. Exercise faithful stewardship over what God has entrusted to you.",
    ],
    discussionQuestions: [
      "What does it mean, concretely, for you to live as an \"image-bearer of God\" in your specific vocation and ministry?",
      "How does the sixth-day commission to \"exercise dominion\" reframe the way we understand authority, leadership, and service in the Church?",
      "What one commitment will you carry forward from this training into your daily life?",
    ],
    scenarios: [
      {
        title: "The Accused Friend",
        text: "You learn that a priest in a neighboring parish, whom you know socially, has been credibly accused of misconduct with a minor. You feel torn between loyalty, disbelief, anger, and sadness. A mutual friend asks you to 'not jump to conclusions' and to 'support Father.' What does it mean to be an image-bearer of God in this moment? What does faithful stewardship — 'dominion' in the Genesis sense — look like?",
      },
    ],
    lectio: {
      text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.",
      ref: "Ephesians 2:10",
      prompts: [
        "Read slowly. You are God's workmanship — His poem, His masterpiece.",
        "What 'good works' has God prepared for you in the area of protecting the vulnerable?",
        "What is God saying to you about your unique vocation — not someone else's, but yours?",
        "Rest in the knowledge that you are made for this. God has prepared you.",
      ],
    },
    examen: "As an image-bearer of God, what is my unique vocation in the work of protecting the vulnerable? What commitment am I willing to make — not as a compliance requirement, but as a response to who God made me to be? What will I do differently starting tomorrow?",
  },
  {
    day: 7, title: "Sabbath Rest", latin: "Sabbatum",
    subtitle: "Rest in the Lord — Eucharistic Reflection",
    verse: "And on the seventh day God finished his work that he had done, and he rested on the seventh day. So God blessed the seventh day and made it holy.",
    ref: "Genesis 2:2-3",
    Icon: Flame,
    intro: `God's rest on the seventh day is not inactivity. It is contemplation — the Creator beholding the work of His hands and finding it very good. It is communion — the love that is the source and summit of all creation delighting in what it has made. It is blessing — God makes the seventh day holy, setting it apart as the destination toward which all the other days were ordered.

In Christian life, the Sabbath becomes the Eucharist — the day of the Lord, the day of the Resurrection, the day when the faithful gather around the altar where Christ speaks the words that are the heart of the Theology of the Body: "This is my body, given for you." The Eucharist is where compliance becomes worship. It is where the body, redeemed and offered in love, finds its final meaning.

This module is structured not as a classroom session but as a holy hour of Eucharistic adoration and guided reflection, with optional communal celebration of the Sacrament of Reconciliation.`,
    content: [
      "Exposition of the Blessed Sacrament and opening hymn.",
      "First Reflection — Creation: In the silence before the Eucharist, meditate on the truth that every human body is created in the image of God and that Christ's Eucharistic body is the fullness of that revelation.",
      "Second Reflection — The Fall: A period of silent examination of conscience, acknowledging the reality of sin, the wounds inflicted on the Body of Christ by the abuse crisis, and our own failures in vigilance, courage, or charity.",
      "Third Reflection — The Formation of a Holy People: Meditation on God's patient work of forming His people in holiness. Reflect on your own formation — what you have received, what remains to be cultivated, and your dependence on grace.",
      "Fourth Reflection — The Messiah: Meditation on the wounds of Christ present in the Eucharist — the same body that was broken on the Cross. Place the wounds of the Church — the wounds of victims, the wounds of scandal, the wounds of your own heart — into the wounds of Christ.",
      "Fifth Reflection — The Church: Meditation on mission. From this altar, you are sent forth. The same Christ who gives His body in the Eucharist sends His Church into the world to protect, to heal, to serve, and to witness.",
      "Five decades of the Rosary, each offered for one intention: (1) the recovery of the truth about the human person; (2) the healing of victims; (3) the formation of holy communities; (4) the redemption of those who have failed; (5) the strengthening of the Church's mission.",
      "Personal act of commitment in the presence of the Blessed Sacrament.",
      "Benediction of the Blessed Sacrament and closing hymn.",
    ],
    discussionQuestions: [],
    scenarios: [],
    lectio: {
      text: "Be still, and know that I am God.",
      ref: "Psalm 46:10",
      prompts: [
        "Be still. Let every thought, every concern, every anxiety fall away.",
        "In the stillness, know that He is God — not you. You are not responsible for saving the Church. You are responsible for being faithful.",
        "What does God want you to know in this moment of rest?",
        "Rest. Simply rest. The seventh day is not an afterthought. It is the purpose of the entire week.",
      ],
    },
    examen: "In the silence of this Sabbath rest, bring your entire journey through this training before the Lord. What has consoled you? What has disturbed you? What has God revealed to you about yourself, about the Church, about your vocation? Make your commitment to Him now — not a compliance form, but a prayer.",
  },
];
