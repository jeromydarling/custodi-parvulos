import { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, Diamond, Hexagon, Cross, Church, Sun, Circle, Leaf, Star, Bird, Crown, Flame, ChevronRight, ArrowLeft, BookOpen, PenLine, Eye, Hand, CheckCircle2 } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// SAFE ENVIRONMENT TRAINING PORTAL
// Pie Pelicane, custodi parvulos
// A Journey Through the Drama of Salvation
// asafeman.com
// ═══════════════════════════════════════════════════════════════

const PelicanLogo = ({ size = 48, color = "#6B3A2A" }) => {
  const r = "#8B2500";
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"block",margin:"0 auto"}}>
      {/* Nimbus / halo behind head */}
      <circle cx="80" cy="28" r="14" stroke={color} strokeWidth="1.2" opacity="0.35" />
      {/* Head */}
      <ellipse cx="80" cy="28" rx="7" ry="8" stroke={color} strokeWidth="2" fill="none" />
      {/* Eye */}
      <circle cx="82" cy="26" r="1.4" fill={color} />
      {/* Beak - long, curving down to breast */}
      <path d="M80 34 L83 38 L80 58" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 34 L77 38 L80 58" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Neck */}
      <path d="M76 35 C74 42, 72 48, 72 56" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M84 35 C86 42, 88 48, 88 56" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* LEFT WING - rises from shoulder, coverts at top, then long feathers cascade down */}
      {/* Wing shoulder / upper edge rising outward */}
      <path d="M72 56 C64 48, 50 40, 34 36 C26 34, 20 36, 18 40" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Coverts - the scalloped upper feather row */}
      <path d="M18 40 C22 38, 28 40, 32 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M26 38 C30 36, 36 38, 40 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M34 36 C38 34, 44 37, 48 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M44 38 C48 36, 52 39, 56 46" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Long flight feathers - cascading downward in parallel lines */}
      <path d="M20 42 C20 56, 22 74, 26 92" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M28 40 C27 54, 28 72, 32 88" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M36 38 C34 52, 34 70, 38 86" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M44 40 C42 52, 42 68, 44 84" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M52 44 C50 56, 49 68, 50 82" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M58 48 C56 58, 55 68, 56 80" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Wing outer edge connecting feather tips */}
      <path d="M26 92 C30 90, 34 88, 38 86 C42 84, 46 83, 50 82 C53 81, 55 80, 56 80" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* RIGHT WING - mirror */}
      <path d="M88 56 C96 48, 110 40, 126 36 C134 34, 140 36, 142 40" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Coverts */}
      <path d="M142 40 C138 38, 132 40, 128 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M134 38 C130 36, 124 38, 120 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M126 36 C122 34, 116 37, 112 44" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M116 38 C112 36, 108 39, 104 46" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Long flight feathers cascading down */}
      <path d="M140 42 C140 56, 138 74, 134 92" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M132 40 C133 54, 132 72, 128 88" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M124 38 C126 52, 126 70, 122 86" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M116 40 C118 52, 118 68, 116 84" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M108 44 C110 56, 111 68, 110 82" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M102 48 C104 58, 105 68, 104 80" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Wing outer edge */}
      <path d="M134 92 C130 90, 126 88, 122 86 C118 84, 114 83, 110 82 C107 81, 105 80, 104 80" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="80" cy="74" rx="16" ry="14" stroke={color} strokeWidth="2" fill="none" />

      {/* Breast wound and three drops of blood */}
      <path d="M78 62 C79 64, 81 64, 82 62" stroke={r} strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="68" r="2" fill={r} />
      <circle cx="76" cy="72" r="1.6" fill={r} />
      <circle cx="84" cy="72" r="1.6" fill={r} />

      {/* Three young - reaching upward */}
      <ellipse cx="68" cy="104" rx="7" ry="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M70 98 C69 94, 74 89, 77 86" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="102" r="1" fill={color} />

      <ellipse cx="80" cy="106" rx="7" ry="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M80 100 C80 96, 80 92, 80 86" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="82" cy="104" r="1" fill={color} />

      <ellipse cx="92" cy="104" rx="7" ry="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M90 98 C91 94, 86 89, 83 86" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="90" cy="102" r="1" fill={color} />

      {/* Nest */}
      <path d="M52 110 C58 120, 68 126, 80 126 C92 126, 102 120, 108 110" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M56 112 C62 118, 70 122, 80 122 C90 122, 98 118, 104 112" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
};

// ─── Storage helpers ───
const store = {
  async get(key) {
    try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
  },
  async set(key, val) {
    try { await window.storage.set(key, JSON.stringify(val)); } catch(e) { console.error(e); }
  }
};

// ─── Content Data ───
const PARTS = [
  {
    id: "creation",
    num: "I",
    title: "Creation",
    latin: "Creatio",
    subtitle: "The Original Design of the Human Person",
    tagline: "In the beginning, God spoke the human person into existence as a masterwork of love",
    Icon: Sparkles,
    color: "#C9A84C",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    meditation: {
      wound: { label: "The Wound", value: "The Right Hand — the hand that creates, that shapes, that blesses" },
      sense: { label: "The Sense", value: "Sight — \"And God saw that it was good\" (Genesis 1:31)" },
      mystery: { label: "The Mystery", value: "The Annunciation — God's creative Word takes flesh" },
      precept: { label: "The Precept", value: "Attend Mass on Sundays — where we encounter the Creator in the Eucharist" },
      pentateuch: { label: "The Book", value: "Genesis — the book of beginnings, of the original design" },
    },
    scripture: { text: "So God created man in his own image, in the image of God he created him; male and female he created them.", ref: "Genesis 1:27" },
    sections: [
      {
        title: "The Body Reveals the Person",
        content: `The foundational insight of the Theology of the Body is that the human body is not merely a biological instrument or an object to be used; it is a revelation of the person. The human person is a body-soul unity — not a soul trapped in a body, and not a body without spiritual significance. The body makes visible what is invisible: the spiritual and the divine.

This principle stands in direct contradiction to the mentality that made abuse possible. When a person in authority uses another person's body as an object of gratification — especially the body of a child or adolescent — that act is not merely a violation of civil law or institutional policy. It is a lie spoken with the body. It contradicts the fundamental truth that every person is a subject, never an object; a gift to be received, never a thing to be consumed.

Genesis opens the Pentateuch with this revelation: in the beginning, God saw everything He had made, and it was very good. The sense of sight, the first sense engaged in creation, is the sense we must recover. We must learn again to see each person as God sees them: as an image of the divine, invested with inviolable dignity.`
      },
      {
        title: "The Nuptial Meaning of the Body",
        content: `John Paul II taught that the body has a "nuptial meaning" — the human body is created for the sincere gift of self to another. This nuptial meaning is expressed in marriage through the total, faithful, and fruitful self-giving of husband and wife. But it is also expressed in celibacy and virginity for the sake of the Kingdom, wherein the celibate person gives himself entirely to God and to the service of others.

In both vocations, the body's meaning is fulfilled through self-donation, never through self-gratification at the expense of another. Drawing on the Second Vatican Council's Gaudium et Spes, John Paul II articulated the "law of the gift": the human person can fully discover his true self only in a sincere gift of self. This law reflects the inner life of the Trinity — three Persons in an eternal communion of self-giving love.

This law of the gift is the theological key that unlocks the meaning of every authentic human relationship, from marriage to priesthood to the teacher-student bond. Every relationship is meant to be governed by the question: Am I giving myself for the good of this person, or am I taking something from them for my own gratification?`
      },
      {
        title: "The Inseparable Connection",
        content: `While Humanae Vitae is most often discussed in the context of married love, its core teaching has universal significance. Paul VI taught that God established an inseparable connection between the unitive meaning and the procreative meaning of the conjugal act. This is a statement about the nature of human sexuality itself. Sexuality is ordered toward both loving union and the possibility of new life. When these dimensions are deliberately separated, the act ceases to speak the truth about the human person.

Sexual abuse is the most extreme form of separating sexuality from its true meaning. It severs the act entirely from love, commitment, mutual self-giving, and openness to life. It reduces sexuality to a mechanism of power, control, and self-gratification.

At the Annunciation — the first Joyful Mystery of the Rosary — the creative Word of God took flesh in the womb of the Virgin Mary. God Himself entered creation through a human body, forever consecrating the body as the site of divine encounter. Every act of abuse is a desecration of what the Annunciation revealed: that the human body is holy ground.`
      },
      {
        title: "Self-Mastery as the Condition of Self-Gift",
        content: `A recurring theme in the Theology of the Body is that genuine love requires self-mastery. Self-mastery is not repression. It is the interior freedom that enables a person to make a genuine gift of himself. No one can give what he does not possess. A person governed by disordered desires rather than governing them cannot truly love. He can only consume, manipulate, or dominate.

This principle has particular urgency for those who embrace celibacy. Celibacy lived without self-mastery is not a gift freely given; it is a burden reluctantly endured, and it becomes a source of interior pressure that can manifest in destructive ways.

The first Precept of the Church — attending Mass on Sundays — is not incidental to this vision. The Eucharist is where we encounter the supreme act of bodily self-gift: Christ saying with His body, "This is my body, given for you." Regular participation in the Eucharist is the primary school of self-gift, the place where we learn what the body is for.`
      }
    ],
    lectio: {
      text: "Then the Lord God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature.",
      ref: "Genesis 2:7",
      prompts: [
        "Read the passage slowly, twice. What word or phrase draws your attention?",
        "Imagine being present at this moment. What do you see? What do you feel?",
        "What is God saying to you, personally, through this passage about the dignity of the body?",
        "Rest in silence. What response rises in your heart?"
      ]
    },
    reflection: "As you consider the truth that the body reveals the person, examine your own heart. How do you see the people you serve in ministry? Do you see them as images of God — or have you allowed yourself to see anyone as less than fully human, fully dignified, fully sacred?"
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
    gradient: "linear-gradient(135deg, #2d1117 0%, #3d1a24 50%, #4a1e2e 100%)",
    meditation: {
      wound: { label: "The Wound", value: "The Left Hand — the hand that receives; the Church received blows from within" },
      sense: { label: "The Sense", value: "Taste — the forbidden fruit; the bitter knowledge of what was done" },
      mystery: { label: "The Mystery", value: "The Agony in the Garden — Christ foresaw all the sins committed in His name" },
      precept: { label: "The Precept", value: "Confess sins at least once a year — confession begins with examination of conscience" },
      pentateuch: { label: "The Book", value: "Exodus — a people enslaved, crying out for deliverance" },
    },
    scripture: { text: "They heard the sound of the Lord God walking in the garden in the cool of the day, and the man and his wife hid themselves.", ref: "Genesis 3:8" },
    sections: [
      {
        title: "The Scale and Timeline of the Crisis",
        content: `The Nature and Scope study documented approximately 10,667 credible allegations of sexual abuse against 4,392 priests and deacons — roughly 4 percent of the more than 109,000 clergy active during the fifty-year study period. The remaining 96 percent were never accused. But the 4 percent who offended caused devastating harm to thousands of victims and to the credibility of the Church's mission.

The timeline follows a distinctive pattern: incidents increased steadily from the mid-1960s, peaked in the late 1970s, and declined sharply through the 1980s, remaining at very low levels thereafter. This temporal pattern is essential because it rules out factors that remained constant throughout the period as primary causes.`
      },
      {
        title: "What the Studies Ruled Out",
        content: `The John Jay researchers explicitly addressed several theories about the cause of the crisis. Priestly celibacy, constant in the Latin Rite since the eleventh century, could not account for a dramatic rise and fall concentrated in a twenty-year window. The exclusively male priesthood remained constant and thus could not explain the specific historical pattern. Fewer than 5 percent of abusing priests exhibited behavior consistent with pedophilia. The vast majority of victims were post-pubescent adolescents, and most abusing priests also had sexual contact with adults.`
      },
      {
        title: "What the Studies Identified",
        content: `The Causes and Context study identified a constellation of interrelated factors:

Inadequate human formation: The majority of abusing priests were trained before the 1970s in environments that provided rigorous spiritual and intellectual formation but virtually no education in self-understanding, emotional competence, or preparation for celibate chastity.

Psychosexual immaturity: Many abusers exhibited confused sexual identities, poor emotional coping, difficulty forming adult relationships, and unresolved adolescent conflicts.

Social and cultural upheaval: The rise in abuse incidents during the 1960s and 1970s was consistent with broader societal increases in crime, drug use, divorce, and premarital sexual behavior.

Situational factors and opportunity: Access to minors, unsupervised settings, and positions of trust facilitated abuse. Abusers frequently employed grooming tactics.

Institutional failures: The initial response of many bishops was to seek treatment rather than protect victims. Accountability was not universal until after the Dallas Charter of 2002.

Histories of personal victimization: Priests who had been sexually abused as minors were at significantly elevated risk. Rates ranged from 17 to 37 percent.`
      },
      {
        title: "The Critical Finding: Human Formation Works",
        content: `Perhaps the most consequential finding is that the development and implementation of human formation curricula in seminaries is directly associated with the sustained decline in abuse. As seminaries began to address psychosexual maturity, emotional intelligence, relational health, and the integrated living of celibate chastity, the incidence of abuse dropped dramatically and has remained low.

The Book of Exodus tells the story of a people enslaved who cry out for deliverance — and God hears them. The Church cried out in the agony of the abuse crisis, and the answer has begun to emerge: formation of the whole person, grounded in the truth about human nature and human sexuality, is the most effective long-term strategy for preventing abuse.`
      }
    ],
    lectio: {
      text: "Have mercy on me, O God, according to your steadfast love; according to your abundant mercy blot out my transgressions. Wash me thoroughly from my iniquity, and cleanse me from my sin.",
      ref: "Psalm 51:1-2",
      prompts: [
        "Read slowly. Let the weight of these words settle into your heart.",
        "Place yourself in the posture of the Church confronting the abuse crisis. What do you feel?",
        "What is God saying to you about truth, repentance, and the courage to confront evil?",
        "Rest in silence. Allow God's mercy to meet the grief and anger you may carry."
      ]
    },
    reflection: "The John Jay studies are the Church's examination of conscience. As you sit with this data, resist the temptation to look away or to rush toward solutions. What movements do you notice in your own heart — grief, anger, confusion, resolve? Bring these honestly before God."
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
    gradient: "linear-gradient(135deg, #1a2e1a 0%, #1e3a24 50%, #244a2e 100%)",
    meditation: {
      wound: { label: "The Wound", value: "The Left Foot — planted on the earth; theology grounded in reality" },
      sense: { label: "The Sense", value: "Hearing — \"Hear, O Israel\" (Deuteronomy 6:4)" },
      mystery: { label: "The Mystery", value: "The Proclamation of the Kingdom — Christ teaches, forming hearts and minds" },
      precept: { label: "The Precept", value: "Receive the Eucharist during Easter season — the Body given in love, not taken by force" },
      pentateuch: { label: "The Book", value: "Leviticus — the holiness code; the ordering of a people set apart" },
    },
    scripture: { text: "You shall be holy, for I the Lord your God am holy.", ref: "Leviticus 19:2" },
    sections: [
      {
        title: "The Convergence of Data and Doctrine",
        content: `The strength of this guide lies in the convergence between empirical findings and theological truth. The John Jay studies documented what happened; the Theology of the Body and Humanae Vitae explain why it happened and how to prevent it.

Inadequate human formation → The body reveals the person; formation must integrate body and soul.
Psychosexual immaturity → Concupiscence distorts the language of the body; redemption requires self-knowledge and grace.
Abusers treated victims as objects → Every person has a nuptial meaning; to use another contradicts their God-given dignity.
Cultural upheaval lowered moral norms → Separating sexuality from its true meaning leads to moral degradation.
Celibacy was inadequately lived → Self-mastery is the condition of self-gift; celibacy requires ongoing interior freedom.
Institutional failures → Truth and love require courage; silence before evil is complicity.
Human formation correlates with decline → Grace builds on nature; formation integrates truth, virtue, and sacramental life.`
      },
      {
        title: "The Prophetic Warnings of Humanae Vitae",
        content: `In 1968, Paul VI predicted that the widespread separation of sexuality from its procreative dimension would lead to: a general lowering of moral standards; increased infidelity; a loss of respect for persons reduced to instruments of enjoyment; and the abuse of governmental power in reproduction. Each prediction has been borne out.

The cultural revolution of the 1960s and 1970s — precisely when abuse incidents peaked — was characterized by exactly the reductive view of sexuality Paul VI warned about. The convergence of his prophetic warning and the John Jay timeline is confirmatory.

The third Precept — receiving the Eucharist during the Easter season — points to the remedy. The Eucharist is the Body given in love, freely and completely. It is the antithesis of abuse.`
      },
      {
        title: "Concupiscence: The Theological Name",
        content: `The psychological profiles in the John Jay studies — intimacy deficits, emotional congruence with adolescents, confused sexual identities, poor self-regulation — have a theological name: concupiscence. John Paul II described concupiscence not simply as strong sexual desire but as a reductive way of seeing another person that strips away their dignity and reduces them to an instrument.

The abusing priests were men in whom concupiscence was never adequately understood, confronted, or redeemed through grace. Their formation addressed the intellect and the spirit but left the heart and body largely untouched.

As the Luminous Mystery of the Proclamation of the Kingdom reminds us, Christ's first public act was to teach. And as Leviticus insists with its meticulous holiness codes, the formation of a holy people is concrete, practical, and demanding. It reaches into every dimension of life — including sexuality, relationships, and the governance of desire.`
      }
    ],
    lectio: {
      text: "Hear, O Israel: The Lord our God, the Lord is one. You shall love the Lord your God with all your heart and with all your soul and with all your might.",
      ref: "Deuteronomy 6:4-5",
      prompts: [
        "Read slowly. What does it mean to love God with ALL your heart — not a divided heart?",
        "Consider the word 'hear.' The formation of a holy people begins with listening. What has been hard to hear in this training?",
        "What is God forming in you through this process? What is He asking you to receive?",
        "Rest in the knowledge that God's formation is an act of love, not punishment."
      ]
    },
    reflection: "God forms His people through law, covenant, and prophetic witness. Consider: What 'holiness codes' does your community need — not arbitrary rules, but practices that protect the sacred dignity of every person? What would it look like for your parish to be 'set apart' in its commitment to protecting the vulnerable?"
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
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 50%, #3d1515 100%)",
    meditation: {
      wound: { label: "The Wound", value: "The Right Foot — stepping forward; from diagnosis to healing" },
      sense: { label: "The Sense", value: "Smell — the fragrance of Christ's sacrifice (2 Corinthians 2:15)" },
      mystery: { label: "The Mystery", value: "The Crucifixion — the wounds that redeem; the body given completely" },
      precept: { label: "The Precept", value: "Observe days of fasting and abstinence — bodily discipline as the school of self-mastery" },
      pentateuch: { label: "The Book", value: "Numbers — the wilderness journey; purification before the promised land" },
    },
    scripture: { text: "By his wounds we are healed.", ref: "Isaiah 53:5" },
    sections: [
      {
        title: "Christ Reveals Man to Himself",
        content: `The Second Vatican Council declared that Christ fully reveals man to man himself and makes his supreme calling clear. We do not know who we are by looking at ourselves alone; we know who we are by looking at Christ. And what Christ reveals is that the human person is made for self-gift.

The Cross is the supreme expression. Christ says with His body on Calvary what every human being is called to say: "This is my body, given for you." The priest who pronounces these words at the altar is called to live them in every dimension of his life. The abusing priest spoke a counter-word: "This is your body, taken for me." The contrast could not be more absolute.`
      },
      {
        title: "The Redemption of the Body Is Real",
        content: `John Paul II was emphatic that the Christian call is not to suppress desire but to transform it through the redemption of the body. This transformation is real and possible — not gritting one's teeth, but allowing grace to progressively reorder the interior life.

The means are the ordinary resources of the Christian life: the sacraments (especially the Eucharist and Confession), spiritual direction, ascetical practices, authentic friendship, genuine community, ongoing formation, and honest self-knowledge.

The fourth Precept — observing fasting and abstinence — points to a truth the crisis confirmed: bodily discipline is not an archaism. It is the school of self-mastery. A person who has never learned to say no to a legitimate appetite will be poorly equipped to say no to an illegitimate one.`
      },
      {
        title: "The Five Wounds and the Healing of the Church",
        content: `Each wound of Christ corresponds to a dimension of the Church's healing:

The Right Hand: The hand that creates and blesses. The Church must recover her creative mission — forming men and women who understand the body's meaning.

The Left Hand: The hand that receives. The Church must learn to receive the truth about herself — the testimony of victims, the findings of researchers, the critiques of those who love her.

The Right Foot: The foot that steps forward. The Church must move from diagnosis to action.

The Left Foot: The foot planted on the ground. The Church must remain grounded in concrete, verifiable practices of protection.

The Side: From Christ's pierced side flowed blood and water — the Eucharist and Baptism. The ultimate healing will come from the sacramental life flowing from the heart of the crucified and risen Lord.`
      },
      {
        title: "Chastity as Integration",
        content: `The virtue of chastity, properly understood, is the integration of sexuality within the person — the interior ordering of desire so that one is free to love authentically. Chastity is not merely the absence of sexual activity; it is the positive capacity to see and treat every person according to their true dignity.

The fragrance of a chaste life is discernible. Communities where chastity is lived authentically have a quality of freedom, joy, transparency, and mutual respect. Communities where it is not have secrecy, anxiety, clericalism, and the power dynamics that enable abuse. Formation in chastity is therefore not merely personal; it is communal.`
      }
    ],
    lectio: {
      text: "He was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.",
      ref: "Isaiah 53:5",
      prompts: [
        "Read slowly. Let each wound of Christ become present to you.",
        "Consider the victims of abuse. Place their wounds alongside Christ's wounds. What do you see?",
        "What healing does Christ offer to the Church through His own brokenness?",
        "Rest in the mystery: the Wounded Healer. What does He say to you?"
      ]
    },
    reflection: "The redemption of the body is real. Do you believe this — not as an abstract doctrine, but as a lived reality? Where in your own life do you need the redemptive power of Christ to transform disordered desire into authentic love?"
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
    gradient: "linear-gradient(135deg, #0a1628 0%, #122240 50%, #1a3358 100%)",
    meditation: {
      wound: { label: "The Wound", value: "The Side (Heart) — from which flowed blood and water: the Church herself" },
      sense: { label: "The Sense", value: "Touch — now we act, we build, we serve" },
      mystery: { label: "The Mystery", value: "The Descent of the Holy Spirit — the Church is empowered for her mission" },
      precept: { label: "The Precept", value: "Provide for the needs of the Church — every member supports the mission of protection" },
      pentateuch: { label: "The Book", value: "Deuteronomy — the covenant renewed before entering the promised land" },
    },
    scripture: { text: "You will receive power when the Holy Spirit has come upon you, and you will be my witnesses.", ref: "Acts 1:8" },
    sections: [
      {
        title: "Structures of Protection",
        content: `A culture of protection is more than policies; it is a community ethos rooted in the truth about the human person:

Physical environment standards: Two-adult rule for all interactions with minors. Open-door policies. Windows in meeting rooms. No private electronic communication between adults and unrelated minors. Transportation and overnight protocols.

Transparency and accountability: Regular compliance audits. Parish safe environment coordinators. Open channels for reporting concerns. A culture where questions are welcomed.

Ongoing formation: Annual refresher training. Integration of Theology of the Body principles into religious education, sacramental preparation, RCIA, marriage preparation, and clergy continuing education.`
      },
      {
        title: "Support and Healing",
        content: `Recognizing that isolation is a risk factor, parishes and dioceses should promote healthy community life among clergy, religious, teachers, and volunteers — fraternal fellowship, spiritual direction, appropriate friendships, and early intervention when signs of distress appear.

Caring for survivors: A culture of protection includes those who have been wounded. Accessible and compassionate victim assistance, support for counseling and healing, respect for the legal process, and a willingness to listen without defensiveness are essential.

The Descent of the Holy Spirit at Pentecost empowers the Church for exactly this mission. And the fifth Precept — providing for the needs of the Church — reminds every member that the mission of protection belongs to all of us.`
      }
    ],
    lectio: {
      text: "And they devoted themselves to the apostles' teaching and the fellowship, to the breaking of bread and the prayers.",
      ref: "Acts 2:42",
      prompts: [
        "Read slowly. Notice the four pillars: teaching, fellowship, Eucharist, prayer.",
        "How does your community embody — or fail to embody — each of these pillars?",
        "What would your parish look like if it truly lived as the early Church described here?",
        "Rest in the presence of the Holy Spirit who empowers the Church for her mission."
      ]
    },
    reflection: "You are being sent. From this formation, you go forth as a member of the Body of Christ, commissioned to protect, to serve, and to witness. What concrete action will you take this week to make your community safer, more transparent, and more faithful to the truth about the human person?"
  }
];

const MODULES = [
  { day: 1, title: "Light", latin: "Lux", subtitle: "The Truth About the Human Person", verse: "And God said, 'Let there be light,' and there was light. And God separated the light from the darkness.", ref: "Genesis 1:3-4", Icon: Sun,
    intro: "On the first day, God's first act is to create light and separate it from darkness. Before anything else can be made, there must be the capacity to see. This module is the 'light' of the entire program.",
    content: ["The body reveals the person — every human being possesses inviolable worth.", "We are made for communion, not isolation. Loneliness is a risk factor.", "Actions upon the body are actions upon the person.", "The 'law of the gift': we discover ourselves in sincere self-giving."],
    scenario: "A new volunteer coach begins spending extra time after practice with a 13-year-old whose parents are going through a divorce. He drives the boy home, buys him gifts, and texts him regularly. Other volunteers notice but assume it's just mentoring. What signs should alert you? What interior movements do you notice as you consider this situation — reluctance to 'make trouble,' desire to give benefit of the doubt, concern for the child?",
    examen: "Where today did I see the image of God in another person? Where did I fail to see it? Where was I tempted to treat someone as less than fully human?"
  },
  { day: 2, title: "The Firmament", latin: "Firmamentum", subtitle: "The Language of the Body and the Meaning of Sexuality", verse: "And God said, 'Let there be a firmament in the midst of the waters, and let it separate the waters from the waters.'", ref: "Genesis 1:6", Icon: Circle,
    intro: "On the second day, God creates structure — the firmament that orders the waters. The meaning inscribed in human sexuality is not a restriction; it is the God-given structure that makes authentic love possible.",
    content: ["The nuptial meaning of the body: made for self-giving love, in marriage and celibacy.", "The inseparable connection (Humanae Vitae): sexuality ordered toward union and life.", "The body's language can be spoken truthfully or falsely. Abuse speaks a profound lie.", "Paul VI's prophetic warnings about the consequences of severing sexuality from meaning."],
    scenario: "A priest in your parish is beloved for his warmth with young people. He frequently hugs teenagers, ruffles their hair, and has them sit close to him during counseling. Some parents express mild discomfort but are told 'Father is just affectionate.' Consider: What does the 'firmament' — the God-given structure of appropriate boundaries — look like here? What interior movements arise as you weigh 'He means well' against the discomfort?",
    examen: "Where in my life do I honor the God-given structure of relationships? Where have I been careless with boundaries — physical, emotional, or digital? Where have I witnessed boundary violations and remained silent?"
  },
  { day: 3, title: "Dry Land and Vegetation", latin: "Terra et Herba", subtitle: "Concupiscence, Self-Mastery, and the Life of Grace", verse: "And God said, 'Let the waters be gathered, and let the dry land appear.' … And the earth brought forth vegetation.", ref: "Genesis 1:9, 12", Icon: Leaf,
    intro: "On the third day, chaotic waters are gathered so dry land can appear — and from it, life springs forth. Self-mastery is the gathering of the waters; virtue is the vegetation that follows.",
    content: ["Concupiscence: the tendency to reduce persons to objects. It affects everyone.", "The John Jay finding: poor self-regulation as unconfronted concupiscence.", "Self-mastery is not repression — it is channeling desire so the soul bears fruit.", "Warning signs: isolation, secrecy, escalating violations, substance abuse, rationalization."],
    scenario: "A teacher at your parish school has become withdrawn over several months. She's drinking more at social events, has stopped attending spiritual direction, and recently made a comment about a student that struck you as oddly personal. Nothing 'concrete' has happened. What do the 'rising waters' look like in this situation? What is your responsibility? Notice your interior resistance to getting involved.",
    examen: "Where are the 'waters rising' in my own life — where is desire ungoverned, where am I losing self-mastery? What practices of prayer, sacrament, and community am I neglecting? Where do I need to ask for help?"
  },
  { day: 4, title: "Lights to Govern", latin: "Luminaria", subtitle: "Recognizing, Responding, and Reporting", verse: "And God said, 'Let there be lights in the firmament of the heavens to separate day from night, and let them be for signs.'", ref: "Genesis 1:14", Icon: Star,
    intro: "On the fourth day, God places lights to govern and to serve as signs. This module provides the practical systems of oversight and the signs we must learn to read.",
    content: ["Grooming behaviors as 'signs to read': gifts, isolation, secrecy, special treatment.", "Warning signs in adults: progressive boundary violations, resistance to oversight.", "Warning signs in children: behavioral changes, withdrawal, fear of specific adults.", "Responding to disclosures: believe, stay calm, document, report immediately.", "Reporting is an act of justice and charity. Silence is the darkness these lights must dispel."],
    scenario: "A 9-year-old in your religious education class draws a picture that disturbs you — it seems to depict an adult touching a child. When you gently ask about it, the child becomes anxious and says 'I'm not supposed to tell.' Walk through exactly what you do next. Notice: What is your heart rate doing? What thoughts arise — 'Maybe I'm overreacting,' 'This will cause so much trouble,' 'What if I'm wrong'? These are the movements to examine.",
    examen: "Where have I seen 'signs' and failed to read them? Where have I allowed the darkness of silence, convenience, or fear to prevent me from acting? What courage is God asking of me?"
  },
  { day: 5, title: "Teeming Life", latin: "Vita Abundans", subtitle: "Building a Culture of Protection", verse: "And God said, 'Let the waters bring forth swarms of living creatures.' … And God blessed them, saying, 'Be fruitful and multiply.'", ref: "Genesis 1:20, 22", Icon: Bird,
    intro: "On the fifth day, life multiplies abundantly. A culture of protection is not sterile or fearful — it is a community teeming with the life of grace, where children and the vulnerable can flourish.",
    content: ["Two-adult rule, open doors, windows, no private digital communication with minors.", "Transparency and accountability: audits, coordinators, open reporting channels.", "Ongoing formation: annual refreshers, Theology of the Body in parish life.", "Support for ministry workers: community, spiritual direction, early intervention.", "Caring for survivors: accessible, compassionate, without defensiveness."],
    scenario: "Your parish is implementing new safe environment policies. Some long-time volunteers are resistant: 'We've never had a problem here,' 'This makes it seem like we don't trust each other,' 'Father would never allow anything to happen.' How do you respond in a way that honors their feelings while insisting on the policies? How do you help them see that a 'teeming' culture of protection is life-giving, not restrictive?",
    examen: "Is my community 'teeming with life' or operating in a mode of fearful compliance? What one thing could I do to help my parish become a place where both joy and accountability flourish? Where is our community barren, and why?"
  },
  { day: 6, title: "Man and Woman in the Image of God", latin: "Imago Dei", subtitle: "Living the Truth — A Vocation for All", verse: "Then God said, 'Let us make man in our image, after our likeness; and let them have dominion.' … And God saw everything that he had made, and behold, it was very good.", ref: "Genesis 1:26, 31", Icon: Crown,
    intro: "On the sixth day, God creates the crown of creation: man and woman, made in His image, blessed with the vocation to be fruitful and to exercise stewardship. God's verdict: very good.",
    content: ["Every baptized person is called to protect the vulnerable — this flows from baptism itself.", "The Church's witness depends on integrity: credibility is inseparable from conduct.", "Hope rooted in redemption: broken persons can be healed, communities renewed.", "Your personal commitment: ongoing formation, vigilance, living the truth in your vocation."],
    scenario: "You learn that a priest in a neighboring parish, whom you know socially, has been credibly accused of misconduct with a minor. You feel torn between loyalty, disbelief, anger, and sadness. A mutual friend asks you to 'not jump to conclusions' and to 'support Father.' What does it mean to be an image-bearer of God in this moment? What does faithful stewardship — 'dominion' in the Genesis sense — look like?",
    examen: "As an image-bearer of God, what is my unique vocation in the work of protecting the vulnerable? What commitment am I willing to make — not as a compliance requirement, but as a response to who God made me to be? What will I do differently starting tomorrow?"
  },
  { day: 7, title: "Sabbath Rest", latin: "Sabbatum", subtitle: "Rest in the Lord — Eucharistic Reflection", verse: "And on the seventh day God finished his work that he had done, and he rested on the seventh day. So God blessed the seventh day and made it holy.", ref: "Genesis 2:2-3", Icon: Flame,
    intro: "God's rest is not inactivity. It is contemplation, communion, and blessing. In Christian life, the Sabbath becomes the Eucharist — where Christ speaks the words at the heart of the Theology of the Body: 'This is my body, given for you.'",
    content: ["Meditation on Creation: every body is made in God's image.", "Meditation on the Fall: examination of conscience.", "Meditation on Formation: gratitude for what you've received.", "Meditation on the Messiah: placing the Church's wounds in Christ's wounds.", "Meditation on the Church: being sent forth.", "Five decades of the Rosary for the five intentions of this guide.", "Personal act of commitment in the presence of the Blessed Sacrament."],
    scenario: null,
    examen: "In the silence of this Sabbath rest, bring your entire journey through this training before the Lord. What has consoled you? What has disturbed you? What has God revealed to you about yourself, about the Church, about your vocation? Make your commitment to Him now — not a compliance form, but a prayer."
  }
];

// ─── APP STATE ───
const VIEWS = { HOME: 0, PART: 1, MODULE: 2 };

export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [currentPart, setCurrentPart] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [partPhase, setPartPhase] = useState(0); // 0=meditation, 1=reading, 2=lectio, 3=reflection
  const [modPhase, setModPhase] = useState(0); // 0=intro, 1=content, 2=scenario, 3=examen
  const [sectionIdx, setSectionIdx] = useState(0);
  const [lectioStep, setLectioStep] = useState(0);
  const [progress, setProgress] = useState({});
  const [journals, setJournals] = useState({});
  const [journalText, setJournalText] = useState("");
  const [fadeIn, setFadeIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    (async () => {
      const p = await store.get("se-progress") || {};
      const j = await store.get("se-journals") || {};
      setProgress(p);
      setJournals(j);
      setLoading(false);
    })();
  }, []);

  const saveProgress = useCallback(async (key, phase) => {
    const np = { ...progress, [key]: Math.max(progress[key] || 0, phase) };
    setProgress(np);
    await store.set("se-progress", np);
  }, [progress]);

  const saveJournal = useCallback(async (key, text) => {
    if (!text.trim()) return;
    const nj = { ...journals, [key]: { text, date: new Date().toISOString() } };
    setJournals(nj);
    await store.set("se-journals", nj);
    setJournalText("");
  }, [journals]);

  const transition = (fn) => {
    setFadeIn(false);
    setTimeout(() => { fn(); setFadeIn(true); scrollRef.current?.scrollTo(0, 0); }, 300);
  };

  const completedParts = PARTS.filter(p => (progress[`part-${p.id}`] || 0) >= 3).length;
  const completedMods = MODULES.filter((_, i) => (progress[`mod-${i}`] || 0) >= 3).length;

  if (loading) return <div style={{ background: "#F5EDE0", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#6B3A2A", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif", fontSize: 18 }}>Loading...</div></div>;

  // ─── STYLES — Warm Stone & Manuscript ───
  const css = {
    root: { fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif", background: "#F5EDE0", color: "#3B2A1A", minHeight: "100vh", overflowY: "auto", position: "relative" },
    mosaic: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.035, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B7355' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", pointerEvents: "none", zIndex: 0 },
    fade: { opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s ease", position: "relative", zIndex: 1 },
    cross: { color: "#8B2500", fontSize: 28, marginBottom: 8, display: "block", textAlign: "center" },
    h1: { fontSize: 32, fontWeight: 700, color: "#6B3A2A", textAlign: "center", margin: "0 0 8px", letterSpacing: 2, textTransform: "uppercase" },
    h2: { fontSize: 20, color: "#8B7355", textAlign: "center", fontStyle: "italic", margin: "0 0 32px", fontWeight: 400 },
    card: (color) => ({ background: "#FFFDF7", border: `1px solid ${color}35`, borderRadius: 8, padding: "20px 24px", cursor: "pointer", transition: "all 0.3s", marginBottom: 12, boxShadow: "0 1px 4px rgba(107,58,42,0.08)" }),
    btn: (color = "#6B3A2A") => ({ background: "transparent", border: `1px solid ${color}50`, color, padding: "12px 32px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 15, letterSpacing: 1, transition: "all 0.3s" }),
    btnSolid: (color = "#6B3A2A") => ({ background: `${color}12`, border: `1px solid ${color}40`, color, padding: "14px 40px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 16, letterSpacing: 1 }),
    textarea: { width: "100%", background: "#FFFDF7", border: "1px solid #D4C4A8", borderRadius: 6, color: "#3B2A1A", fontFamily: "inherit", fontSize: 15, padding: 16, minHeight: 120, resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" },
    divider: { width: 60, height: 1, background: "linear-gradient(90deg, transparent, #B8A080, transparent)", margin: "24px auto" },
    tag: (color) => ({ display: "inline-block", background: `${color}15`, color, border: `1px solid ${color}30`, borderRadius: 20, padding: "4px 14px", fontSize: 12, letterSpacing: 1 }),
    progressDot: (done) => ({ width: 10, height: 10, borderRadius: "50%", background: done ? "#6B3A2A" : "#D4C4A8", border: "1px solid #B8A080", transition: "all 0.3s" }),
    medRow: { display: "flex", gap: 16, padding: "10px 0", borderBottom: "1px solid #E8DCC8" },
    medLabel: { width: 100, textAlign: "right", color: "#8B2500", fontWeight: 700, fontSize: 13, flexShrink: 0, letterSpacing: 1 },
    medValue: { color: "#5C4A3A", fontSize: 14, lineHeight: 1.5 },
    prose: { fontSize: 16, lineHeight: 1.9, color: "#4A3828", maxWidth: 680, margin: "0 auto" },
  };

  // ─── HOME VIEW ───
  if (view === VIEWS.HOME) {
    return (
      <div style={css.root} ref={scrollRef}>
        <div style={css.mosaic} />
        <div style={{ ...css.fade, maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ textAlign: "center" }}>
            <PelicanLogo size={160} color="#6B3A2A" />
            <p style={{ color: "#8B2500", fontSize: 14, fontStyle: "italic", marginTop: 8, marginBottom: 2, letterSpacing: 1 }}>Pie Pelicane, custodi parvulos</p>
            <p style={{ color: "#B8A080", fontSize: 12, fontStyle: "italic", marginBottom: 20 }}>O loving Pelican, guard the little ones</p>
          </div>
          <h1 style={{ ...css.h1, fontSize: 38, letterSpacing: 4 }}>Custodi Parvulos</h1>
          <p style={{ fontSize: 15, color: "#8B7355", textAlign: "center", margin: "4px 0 8px", fontStyle: "italic" }}>Guard the Little Ones</p>
          <p style={css.h2}>How the Drama of Salvation Leads to Renewal</p>
          <div style={css.divider} />

          {/* Progress */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ color: "#6B3A2A", fontSize: 13, letterSpacing: 2 }}>YOUR JOURNEY</span>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
              {[...Array(12)].map((_, i) => <div key={i} style={css.progressDot(i < completedParts + completedMods)} />)}
            </div>
            <p style={{ color: "#B8A080", fontSize: 13, marginTop: 8 }}>{completedParts + completedMods} of 12 completed</p>
          </div>

          {/* Parts */}
          <h3 style={{ color: "#6B3A2A", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>The Five Parts — <span style={{ fontStyle: "italic", textTransform: "none" }}>Drama Salutis</span></h3>
          {PARTS.map((part, i) => {
            const done = (progress[`part-${part.id}`] || 0) >= 3;
            return (
              <div key={part.id} style={css.card(part.color)} onClick={() => transition(() => { setCurrentPart(i); setPartPhase(0); setSectionIdx(0); setLectioStep(0); setView(VIEWS.PART); })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <part.Icon size={20} color={part.color} strokeWidth={1.5} />
                      <span style={{ color: part.color, fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PART {part.num}</span>
                      {done && <span style={css.tag("#4A7C59")}><CheckCircle2 size={12} style={{marginRight:4,verticalAlign:"middle"}} /> COMPLETE</span>}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: "#3B2A1A" }}>{part.title}</div>
                    <div style={{ fontSize: 13, color: "#8B2500", fontStyle: "italic", marginTop: 2 }}>{part.latin}</div>
                    <div style={{ fontSize: 14, color: "#8B7355", marginTop: 4 }}>{part.subtitle}</div>
                  </div>
                  <span style={{ color: "#D4C4A8", fontSize: 24 }}>›</span>
                </div>
              </div>
            );
          })}

          <div style={{ ...css.divider, margin: "40px auto" }} />

          {/* Modules */}
          <h3 style={{ color: "#6B3A2A", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>The Seven Modules — <span style={{ fontStyle: "italic", textTransform: "none" }}>Hebdomada Creationis</span></h3>
          {MODULES.map((mod, i) => {
            const done = (progress[`mod-${i}`] || 0) >= 3;
            return (
              <div key={i} style={css.card("#6B3A2A")} onClick={() => transition(() => { setCurrentModule(i); setModPhase(0); setView(VIEWS.MODULE); })}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <mod.Icon size={18} color="#6B3A2A" strokeWidth={1.5} />
                      <span style={{ color: "#6B3A2A", fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>DIES {["I","II","III","IV","V","VI","VII"][mod.day-1]}</span>
                      {done && <span style={css.tag("#4A7C59")}><CheckCircle2 size={12} style={{marginRight:4,verticalAlign:"middle"}} /> COMPLETE</span>}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: "#3B2A1A" }}>{mod.title}</div>
                    <div style={{ fontSize: 13, color: "#8B2500", fontStyle: "italic", marginTop: 2 }}>{mod.latin}</div>
                    <div style={{ fontSize: 14, color: "#8B7355", marginTop: 4 }}>{mod.subtitle}</div>
                  </div>
                  <span style={{ color: "#D4C4A8", fontSize: 24 }}>›</span>
                </div>
              </div>
            );
          })}

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <PelicanLogo size={72} color="#B8A080" />
            <p style={{ marginTop: 8, fontStyle: "italic", color: "#8B2500", fontSize: 13 }}>Pie Pelicane, custodi parvulos</p>
            <p style={{ marginTop: 2, fontStyle: "italic", color: "#B8A080", fontSize: 12 }}>O loving Pelican, guard the little ones</p>
            <div style={{ ...css.divider, marginTop: 16, marginBottom: 8 }} />
            <p style={{ fontStyle: "italic", color: "#B8A080", fontSize: 13 }}>"This is my body, given for you."</p>
            <p style={{ marginTop: 16, fontSize: 11, letterSpacing: 2, color: "#D4C4A8", textTransform: "uppercase" }}>Safe Environment Training Portal</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── PART VIEW ───
  if (view === VIEWS.PART && currentPart !== null) {
    const part = PARTS[currentPart];
    const phases = ["Meditation", "Reading", "Lectio Divina", "Reflection"];

    return (
      <div style={{ ...css.root, background: "#F5EDE0" }} ref={scrollRef}>
        <div style={css.mosaic} />
        <div style={{ ...css.fade, maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <button style={{ ...css.btn(part.color), padding: "8px 20px", fontSize: 13 }} onClick={() => transition(() => setView(VIEWS.HOME))}>← Home</button>
            <div style={{ display: "flex", gap: 6 }}>{phases.map((ph, i) => <div key={i} style={{ ...css.progressDot(partPhase >= i), background: partPhase >= i ? part.color : "#D4C4A8", borderColor: `${part.color}40` }} title={ph} />)}</div>
          </div>

          {/* Phase 0: Meditation */}
          {partPhase === 0 && (
            <div style={{ textAlign: "center" }}>
              <Cross size={32} color="#8B2500" strokeWidth={1.5} />
              <div style={{ color: part.color, fontSize: 13, letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>PART {part.num}</div>
              <h1 style={{ fontSize: 36, color: "#6B3A2A", margin: "8px 0" }}>{part.title.toUpperCase()}</h1>
              <p style={{ color: "#8B2500", fontSize: 15, fontStyle: "italic", margin: "0 0 8px" }}>{part.latin}</p>
              <p style={{ color: "#8B7355", fontStyle: "italic", fontSize: 16, maxWidth: 500, margin: "0 auto 32px" }}>{part.tagline}</p>

              <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "left" }}>
                {Object.values(part.meditation).map((m, i) => (
                  <div key={i} style={css.medRow}>
                    <div style={css.medLabel}>{m.label}</div>
                    <div style={css.medValue}>{m.value}</div>
                  </div>
                ))}
              </div>

              <div style={css.divider} />
              <p style={{ color: "#8B2500", fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>SCRIPTURE FOR MEDITATION</p>
              <p style={{ fontStyle: "italic", fontSize: 17, color: "#4A3828", maxWidth: 500, margin: "0 auto 8px", lineHeight: 1.7 }}>"{part.scripture.text}"</p>
              <p style={{ color: "#B8A080", fontSize: 14 }}>— {part.scripture.ref}</p>

              <div style={{ marginTop: 40 }}>
                <button style={css.btnSolid(part.color)} onClick={() => { setPartPhase(1); saveProgress(`part-${part.id}`, 0); scrollRef.current?.scrollTo(0, 0); }}>Begin Reading →</button>
              </div>
            </div>
          )}

          {/* Phase 1: Reading */}
          {partPhase === 1 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <span style={{ color: part.color, fontSize: 13, letterSpacing: 3, fontWeight: 700 }}>PART {part.num} · {part.latin.toUpperCase()}</span>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                  {part.sections.map((_, i) => <div key={i} style={{ width: 32, height: 3, borderRadius: 2, background: i <= sectionIdx ? part.color : "#D4C4A8" }} />)}
                </div>
              </div>

              <h2 style={{ fontSize: 24, color: "#6B3A2A", marginBottom: 24 }}>{part.sections[sectionIdx].title}</h2>
              {part.sections[sectionIdx].content.split("\n\n").map((para, i) => (
                <p key={i} style={{ ...css.prose, marginBottom: 20 }}>{para}</p>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                <button style={css.btn(part.color)} onClick={() => { if (sectionIdx > 0) { setSectionIdx(sectionIdx - 1); scrollRef.current?.scrollTo(0, 0); } }}>← Previous</button>
                {sectionIdx < part.sections.length - 1 ? (
                  <button style={css.btnSolid(part.color)} onClick={() => { setSectionIdx(sectionIdx + 1); scrollRef.current?.scrollTo(0, 0); }}>Continue →</button>
                ) : (
                  <button style={css.btnSolid(part.color)} onClick={() => { setPartPhase(2); setLectioStep(0); saveProgress(`part-${part.id}`, 1); scrollRef.current?.scrollTo(0, 0); }}>Enter Lectio Divina →</button>
                )}
              </div>
            </div>
          )}

          {/* Phase 2: Lectio Divina */}
          {partPhase === 2 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: part.color, fontSize: 13, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>LECTIO DIVINA</p>
              <h2 style={{ fontSize: 24, color: "#6B3A2A", marginBottom: 32 }}>Sacred Reading</h2>

              <div style={{ background: "#FFFDF7", border: "1px solid #E8DCC8", borderRadius: 8, padding: 32, maxWidth: 560, margin: "0 auto 32px" }}>
                <p style={{ fontStyle: "italic", fontSize: 18, color: "#4A3828", lineHeight: 1.8, marginBottom: 12 }}>"{part.lectio.text}"</p>
                <p style={{ color: "#B8A080", fontSize: 14 }}>— {part.lectio.ref}</p>
              </div>

              <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "left" }}>
                {part.lectio.prompts.map((prompt, i) => (
                  <div key={i} style={{ padding: "16px 20px", marginBottom: 8, background: i === lectioStep ? `${part.color}10` : "transparent", border: i === lectioStep ? `1px solid ${part.color}25` : "1px solid transparent", borderRadius: 8, transition: "all 0.3s", cursor: "pointer" }} onClick={() => setLectioStep(i)}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ color: part.color, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{["Lectio", "Meditatio", "Oratio", "Contemplatio"][i]}</span>
                      <p style={{ color: i === lectioStep ? "#3B2A1A" : "#B8A080", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{prompt}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={css.divider} />
              <p style={{ color: "#B8A080", fontSize: 13, marginBottom: 16 }}>Take your time with each movement. There is no rush.</p>
              <button style={css.btnSolid(part.color)} onClick={() => { setPartPhase(3); saveProgress(`part-${part.id}`, 2); scrollRef.current?.scrollTo(0, 0); }}>Enter Reflection →</button>
            </div>
          )}

          {/* Phase 3: Reflection + Journal */}
          {partPhase === 3 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#8B2500", fontSize: 13, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>EXAMINATION OF CONSCIENCE</p>
              <h2 style={{ fontSize: 24, color: "#6B3A2A", marginBottom: 32 }}>Reflection</h2>

              <div style={{ background: "#FFFDF7", border: "1px solid #E8DCC8", borderRadius: 8, padding: 32, maxWidth: 600, margin: "0 auto 32px", textAlign: "left" }}>
                <p style={{ ...css.prose, fontStyle: "italic" }}>{part.reflection}</p>
              </div>

              <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
                <p style={{ color: "#8B7355", fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>YOUR JOURNAL</p>
                <textarea style={css.textarea} placeholder="Write your reflection here. This is saved privately and is for your formation, not for evaluation..." value={journalText} onChange={e => setJournalText(e.target.value)} />
                {journals[`part-${part.id}`] && (
                  <div style={{ background: "#F0E8D8", borderRadius: 8, padding: 16, marginTop: 12 }}>
                    <p style={{ color: "#B8A080", fontSize: 12 }}>Previous reflection ({new Date(journals[`part-${part.id}`].date).toLocaleDateString()}):</p>
                    <p style={{ color: "#5C4A3A", fontSize: 14, lineHeight: 1.6, marginTop: 4 }}>{journals[`part-${part.id}`].text}</p>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                  <button style={css.btn(part.color)} onClick={() => saveJournal(`part-${part.id}`, journalText)}>Save Reflection</button>
                  <button style={css.btnSolid(part.color)} onClick={() => { if (journalText.trim()) saveJournal(`part-${part.id}`, journalText); saveProgress(`part-${part.id}`, 3); transition(() => setView(VIEWS.HOME)); }}>Complete {part.latin} →</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── MODULE VIEW ───
  if (view === VIEWS.MODULE && currentModule !== null) {
    const mod = MODULES[currentModule];
    const phases = mod.scenario ? ["Opening", "Formation", "Discernment", "Examen"] : ["Opening", "Formation", "Meditation", "Examen"];
    const col = "#6B3A2A";

    return (
      <div style={css.root} ref={scrollRef}>
        <div style={css.mosaic} />
        <div style={{ ...css.fade, maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <button style={{ ...css.btn(col), padding: "8px 20px", fontSize: 13 }} onClick={() => transition(() => setView(VIEWS.HOME))}>← Home</button>
            <div style={{ display: "flex", gap: 6 }}>{phases.map((ph, i) => <div key={i} style={{ ...css.progressDot(modPhase >= i) }} title={ph} />)}</div>
          </div>

          {/* Phase 0: Opening */}
          {modPhase === 0 && (
            <div style={{ textAlign: "center" }}>
              <mod.Icon size={44} color="#6B3A2A" strokeWidth={1.2} />
              <div style={{ color: col, fontSize: 13, letterSpacing: 3, marginTop: 16, fontWeight: 700 }}>DIES {["I","II","III","IV","V","VI","VII"][mod.day-1]}</div>
              <h1 style={{ fontSize: 32, color: "#6B3A2A", margin: "8px 0" }}>{mod.title}</h1>
              <p style={{ color: "#8B2500", fontSize: 15, fontStyle: "italic", margin: "0 0 4px" }}>{mod.latin}</p>
              <p style={{ color: "#8B7355", fontSize: 16, marginBottom: 32 }}>{mod.subtitle}</p>

              <div style={{ background: "#FFFDF7", border: "1px solid #E8DCC8", borderRadius: 8, padding: 32, maxWidth: 560, margin: "0 auto 32px" }}>
                <p style={{ fontStyle: "italic", fontSize: 16, color: "#4A3828", lineHeight: 1.8, marginBottom: 12 }}>"{mod.verse}"</p>
                <p style={{ color: "#B8A080", fontSize: 14 }}>— {mod.ref}</p>
              </div>

              <p style={{ ...css.prose, maxWidth: 560, margin: "0 auto 32px", textAlign: "left" }}>{mod.intro}</p>

              <button style={css.btnSolid(col)} onClick={() => { setModPhase(1); saveProgress(`mod-${currentModule}`, 0); scrollRef.current?.scrollTo(0, 0); }}>Begin Formation →</button>
            </div>
          )}

          {/* Phase 1: Content */}
          {modPhase === 1 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <span style={{ color: col, fontSize: 13, letterSpacing: 3, fontWeight: 700 }}>DIES {["I","II","III","IV","V","VI","VII"][mod.day-1]} · {mod.latin.toUpperCase()}</span>
              </div>

              <h2 style={{ fontSize: 22, color: "#6B3A2A", marginBottom: 24 }}>Key Formation Points</h2>
              {mod.content.map((point, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                  <span style={{ color: "#8B2500", fontWeight: 700, fontSize: 16, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                  <p style={{ ...css.prose, margin: 0 }}>{point}</p>
                </div>
              ))}

              <div style={{ textAlign: "center", marginTop: 40 }}>
                <button style={css.btnSolid(col)} onClick={() => { setModPhase(2); saveProgress(`mod-${currentModule}`, 1); scrollRef.current?.scrollTo(0, 0); }}>{mod.scenario ? "Enter Discernment →" : "Enter Meditation →"}</button>
              </div>
            </div>
          )}

          {/* Phase 2: Scenario / Meditation */}
          {modPhase === 2 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#8B2500", fontSize: 13, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>{mod.scenario ? "SCENARIO-BASED DISCERNMENT" : "GUIDED MEDITATION"}</p>
              <h2 style={{ fontSize: 22, color: "#6B3A2A", marginBottom: 32 }}>{mod.scenario ? "Notice Your Interior Movements" : "Sabbath Meditation"}</h2>

              <div style={{ background: "#FFFDF7", border: "1px solid #E8DCC8", borderRadius: 8, padding: 32, maxWidth: 600, margin: "0 auto 32px", textAlign: "left" }}>
                <p style={{ ...css.prose, fontStyle: "italic" }}>{mod.scenario || mod.intro}</p>
              </div>

              {mod.scenario && (
                <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
                  <p style={{ color: "#8B7355", fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>WHAT DO YOU NOTICE IN YOURSELF?</p>
                  <textarea style={css.textarea} placeholder="Describe the interior movements you notice: resistance, concern, fear, courage, consolation, desolation..." value={journalText} onChange={e => setJournalText(e.target.value)} />
                </div>
              )}

              <div style={{ marginTop: 32 }}>
                <button style={css.btnSolid(col)} onClick={() => { if (journalText.trim()) saveJournal(`mod-${currentModule}-scenario`, journalText); setModPhase(3); saveProgress(`mod-${currentModule}`, 2); scrollRef.current?.scrollTo(0, 0); }}>Enter Examen →</button>
              </div>
            </div>
          )}

          {/* Phase 3: Examen */}
          {modPhase === 3 && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#8B2500", fontSize: 13, letterSpacing: 3, fontWeight: 700, marginBottom: 8 }}>IGNATIAN EXAMEN</p>
              <h2 style={{ fontSize: 22, color: "#6B3A2A", marginBottom: 32 }}>Examination of Conscience</h2>

              <div style={{ background: "#FFFDF7", border: "1px solid #E8DCC8", borderRadius: 8, padding: 32, maxWidth: 600, margin: "0 auto 32px", textAlign: "left" }}>
                <p style={{ ...css.prose, fontStyle: "italic" }}>{mod.examen}</p>
              </div>

              <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
                <p style={{ color: "#8B7355", fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>YOUR EXAMEN JOURNAL</p>
                <textarea style={css.textarea} placeholder="In the silence of your heart, write what God is showing you..." value={journalText} onChange={e => setJournalText(e.target.value)} />

                {journals[`mod-${currentModule}-examen`] && (
                  <div style={{ background: "#F0E8D8", borderRadius: 8, padding: 16, marginTop: 12 }}>
                    <p style={{ color: "#B8A080", fontSize: 12 }}>Previous examen ({new Date(journals[`mod-${currentModule}-examen`].date).toLocaleDateString()}):</p>
                    <p style={{ color: "#5C4A3A", fontSize: 14, lineHeight: 1.6, marginTop: 4 }}>{journals[`mod-${currentModule}-examen`].text}</p>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                  <button style={css.btn(col)} onClick={() => saveJournal(`mod-${currentModule}-examen`, journalText)}>Save Examen</button>
                  <button style={css.btnSolid(col)} onClick={() => { if (journalText.trim()) saveJournal(`mod-${currentModule}-examen`, journalText); saveProgress(`mod-${currentModule}`, 3); transition(() => setView(VIEWS.HOME)); }}>Complete Dies {["I","II","III","IV","V","VI","VII"][mod.day-1]} →</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
