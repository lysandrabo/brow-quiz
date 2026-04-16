import { useState, useEffect } from "react";

const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiODNjOWI4YjljYzY1MTZmZTM0MWFmNmI0ZTJlN2IxNWM2YTk4ZTMzZmVjZWY2NmViNDY1MDMzNWE5ODlhMTM0NTU1OGZlNzBkMDc0ZTI1Y2MiLCJpYXQiOjE3NzU1MTUxOTMuMDcyMDAxLCJuYmYiOjE3NzU1MTUxOTMuMDcyMDAzLCJleHAiOjQ5MzExODg3OTMuMDY4MTQ1LCJzdWIiOiIxMTE4MjA2Iiwic2NvcGVzIjpbXX0.SvL0JnOOFkDm8SMNGihnuZi9MI1P8Lyw4va9sfTUS99FIIwePXm5xZz9tZK80u3yRZkvXB7cphJGsHICPYMWD7wAk9k6W7VXGVuA_8kf9BAGLSFzN8dtjtKSCLSmLswJGUHfBEfA_QpbgagjU0oAOQiZpKyEKtoRoILxqxtszOtxvF-y0jE66fwBaTQwDEA4e4H5BVjkSVmAE2YKnF0Y4VPRWypg7Zzkqo6eGBF7r60MHzNpHVTeUIIyd7LErXhavGLo7v0AC8cxDZuxnHCwTzWzQk0BGqab4_ktrwP2JkNLzFbeiWDAqUovlTVrzoqWAsKv5oEkGNsDdF6oCSY1Wq8qOPjQ3NbV6CROXGpIp6PBfEHxRaUv929drD9pZyZNdd0f6t2xyIIM8wc7cQNGVGh6uqGsWCypJRS6fv_jywym1nx4JRtxHNq9ttfg2jgTBlqcwoEpqq763AuiZ5xe7rwr0rWnA3f2NgJq9g6duFM66qlZogOiQQcJn0oBmJL_9jnRnyBPxiX_4NPjqITr0tp7dvKInuBVhe24nfRrg_d3p_qbjWUCUZcMIFucfabCDgmqQ80SvkcB_zW_DO5fz1v4Xj4mbj2Qzh_lMB7vGGJ9I_cVaWBgSsltQuqV41IA6ffyCDC4ko6RoBJMQrbmEYswlCJqOmyz5FYRpT--wBU';
const MAILERLITE_GROUP_ID = '184040499599901836';

// ─── PHOTO LIBRARY ────────────────────────────────────────────────
// Each photo set: { before, after, technique, skinTones, conditions, density, texture, tags }
const PHOTO_LIBRARY = [
  // ── SOFT OMBRE
  {
    id: "so_hispanic_thick_sparse",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6748_u2bn3q",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6742_wdsibj",
    technique: "softOmbre",
    skinTones: ["medium"],
    conditions: [],
    density: ["sparse"],
    texture: ["coarse"],
    tags: ["hispanic", "thick_sparse", "good_skin"],
  },
  {
    id: "so_hispanic_thin",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6101_pj9idl",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6099_amso8o",
    technique: "softOmbre",
    skinTones: ["light"],
    conditions: [],
    density: ["sparse", "minimal"],
    texture: ["soft"],
    tags: ["hispanic", "naturally_thin"],
  },
  {
    id: "so_aa_missing_tails_mature",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/v1776290059/IMG_5720_m4sqk4",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/v1776290059/IMG_5721_vbq92r",
    technique: "softOmbre",
    skinTones: ["deep"],
    conditions: ["mature"],
    density: ["uneven", "minimal"],
    texture: ["soft"],
    tags: ["african_american", "missing_tails", "mature"],
  },
  {
    id: "so_caucasian_mature_blonde",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_8739_dugs5x",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_8729_gap6ev",
    technique: "softOmbre",
    skinTones: ["fair"],
    conditions: ["mature"],
    density: ["sparse"],
    texture: ["coarse", "soft"],
    tags: ["caucasian", "mature", "blonde"],
  },
  {
    id: "so_hispanic_previous_work",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_7642_g7rg2h",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_8992_avzzfv",
    technique: "softOmbre",
    skinTones: ["medium"],
    conditions: [],
    density: ["sparse"],
    texture: ["medium"],
    tags: ["hispanic", "previous_work"],
  },

  // ── NANO HAIRSTROKES
  {
    id: "hs_hispanic_sparse_fine",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6111_arzbmv",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/v1776290059/IMG_6108_mkur7d",
    technique: "hairstrokes",
    skinTones: ["light"],
    conditions: [],
    density: ["sparse"],
    texture: ["soft"],
    tags: ["hispanic", "sparse", "fine_hair"],
  },
  {
    id: "hs_indian_full_fluffy",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6105_i4peyz",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6107_vnfkag",
    technique: "hairstrokes",
    skinTones: ["medium"],
    conditions: [],
    density: ["full", "sparse"],
    texture: ["medium", "coarse"],
    tags: ["indian", "fluffy", "medium_thick"],
  },
  {
    id: "hs_caucasian_full_sparse_medium",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6102_pni8fs",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6104_cesjxf",
    technique: "hairstrokes",
    skinTones: ["fair", "light"],
    conditions: [],
    density: ["full", "sparse"],
    texture: ["medium"],
    tags: ["caucasian", "full_sparse", "medium"],
  },
  {
    id: "hs_caucasian_textured_coarse",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5803_gnfgao",
    technique: "hairstrokes",
    skinTones: ["fair", "light"],
    conditions: [],
    density: ["full"],
    texture: ["coarse"],
    tags: ["caucasian", "textured_skin", "coarse"],
  },
  {
    id: "hs_caucasian_blonde_medium",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6117_tkutdh",
    technique: "hairstrokes",
    skinTones: ["fair", "light"],
    conditions: [],
    density: ["full", "sparse"],
    texture: ["medium"],
    tags: ["caucasian", "blonde", "medium"],
  },
  {
    id: "hs_hispanic_mature_sparse_patchy",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5696_yc2diz",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5697_efgegm",
    technique: "hairstrokes",
    skinTones: ["medium"],
    conditions: ["mature"],
    density: ["sparse"],
    texture: ["medium"],
    tags: ["hispanic", "mature", "sparse_patchy"],
  },

  // ── NANO COMBINATION
  {
    id: "nc_caucasian_no_tails",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_9254_tc2coe",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/Live_20260415111434493_dkmgxe",
    technique: "nanoCombination",
    skinTones: ["light"],
    conditions: [],
    density: ["uneven"],
    texture: ["medium"],
    tags: ["caucasian", "no_tails", "good_skin"],
  },
  {
    id: "nc_hispanic_sparse_thick",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5703_s70eg9",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5704_idvdnr",
    technique: "nanoCombination",
    skinTones: ["medium"],
    conditions: [],
    density: ["sparse"],
    texture: ["coarse"],
    tags: ["hispanic", "sparse_thick_texture", "good_skin"],
  },
  {
    id: "nc_hispanic_oily_coarse",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/Live_20260414155815944_tscp0z",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5965_tjbf1t",
    technique: "nanoCombination",
    skinTones: ["medium"],
    conditions: [],
    density: ["full"],
    texture: ["coarse"],
    tags: ["hispanic", "oily_skin", "coarse_unruly"],
  },
  {
    id: "nc_hispanic_soft_good",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5715_cjfxko",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5716_hy3grk",
    technique: "nanoCombination",
    skinTones: ["medium"],
    conditions: [],
    density: ["full"],
    texture: ["soft", "medium"],
    tags: ["hispanic", "soft_combo", "good_skin"],
  },
  {
    id: "nc_caucasian_oily_fluffy",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_0720_vjtr24",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_0717_eyv0vi",
    technique: "nanoCombination",
    skinTones: ["fair", "light"],
    conditions: [],
    density: ["full"],
    texture: ["medium"],
    tags: ["caucasian", "oily_textured", "fluffy"],
  },
  {
    id: "nc_hispanic_full_medium",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_3421_d0misd",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6113_c3crxs",
    technique: "nanoCombination",
    skinTones: ["light", "medium"],
    conditions: [],
    density: ["full"],
    texture: ["medium"],
    tags: ["hispanic", "full_hair", "medium_texture"],
  },

  // ── MAKEUP OMBRE
  {
    id: "mo_hispanic_sparse_fine",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5718_o8vyrt",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_5719_odmu5a",
    technique: "makeupOmbre",
    skinTones: ["medium"],
    conditions: [],
    density: ["minimal", "sparse"],
    texture: ["soft"],
    tags: ["hispanic", "very_sparse_fine"],
  },
  {
    id: "mo_aa_minimal_hair",
    before: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6097_sxxewu",
    after: "https://res.cloudinary.com/do1ktljgb/image/upload/IMG_6096_kyfube",
    technique: "makeupOmbre",
    skinTones: ["mediumDark"],
    conditions: [],
    density: ["minimal"],
    texture: ["soft"],
    tags: ["african_american", "barely_any_hair", "great_skin"],
  },
];

// ─── PHOTO MATCHING ENGINE ────────────────────────────────────────
function pickPhoto(technique, answers, conditions) {
  const { skinTone, hairDensity, hairTexture, skinType } = answers;
  const isMature = conditions.includes("mature") || skinType === "mature";

  const pool = PHOTO_LIBRARY.filter(p => p.technique === technique);
  if (!pool.length) return null;

  // Score each photo by how well it matches the client
  const scored = pool.map(photo => {
    let score = 0;

    // Skin tone match (highest priority)
    if (skinTone && photo.skinTones.includes(skinTone)) score += 5;

    // Mature skin match
    if (isMature && photo.conditions.includes("mature")) score += 4;
    if (!isMature && photo.conditions.includes("mature")) score -= 2;

    // Hair density match
    if (hairDensity && photo.density.includes(hairDensity)) score += 3;

    // Hair texture match
    if (hairTexture && photo.texture.includes(hairTexture)) score += 2;

    return { photo, score };
  });

  // Sort by score descending, pick best match
  scored.sort((a, b) => b.score - a.score);
  return scored[0].photo;
}


// ─── COLOUR TOKENS ────────────────────────────────────────────────
const C = {
  cream: "#FBF7F4", warm: "#FEF9F6", dark: "#2A1F1F",
  mid: "#6B4E4E", light: "#9B7575", blush: "#E8B4BE",
  dusty: "#D4919E", accent: "#B5636E", deep: "#C07080", gold: "#C9A96E",
};

// ─── RESULT DATA ──────────────────────────────────────────────────
const RESULTS = {
  hairstrokes: {
    name: "Full Nano Hairstrokes",
    tagline: "The most natural, undetectable brow technique in existence.",
    emoji: "🪶",
    color: C.accent,
    education: "Nano hairstrokes use an ultra-fine digital machine to place individual hair-like strokes directly into the skin. Each stroke is hand-crafted to mimic the exact direction, angle and depth of your real brow hair. Up close, in any lighting, from any angle they look like real hair. Not like makeup. Not like tattooed brows. Like yours. This is the most detailed and time-intensive technique, which is exactly why the results are so undetectable. It requires enough natural brow hair to blend the strokes into so the result looks seamless and completely real.",
    body: "She wakes up. No routine holding her hostage. Just her face polished, intentional and effortlessly put together before the day even starts. That's what nano hairstrokes give you. Every single stroke is placed by hand, mapped to your bone structure, matched to your natural hair direction, designed to disappear into your face so completely that no one will ever know they're there. Not because they look done. Because they look exactly like you. This is for the woman who wants to move through her day with one less thing pulling at her attention. One appointment. Results that can last up to 18 months. The most natural investment your face will ever thank you for.",
    details: [
      { label: "Technique", value: "Digital nano machine with ultra-fine individual hair strokes placed by hand" },
      { label: "Best For", value: "Normal, combination or dry skin with existing hair to work with" },
      { label: "Longevity", value: "12 to 18 months depending on skin type, lifestyle and genetics" },
      { label: "Healing", value: "7 to 10 days. Strokes soften beautifully as they heal" },
      { label: "Pain Level", value: "Low to mild. More annoying than painful. Most clients are genuinely surprised" },
      { label: "Perfecting Session", value: "6 to 8 weeks after your first appointment. Then most clients go 2 to 3 years before a refresh" },
    ],
    perfect: ["You have normal, combination or dry skin", "You have enough natural hair to work with", "You want completely undetectable results", "You want brows that look like they just grew that way", "You wear little to no makeup and want brows that carry your whole face", "You're done overthinking your brow routine"],
    note: "Nano hairstrokes are honestly my favourite technique to perform. There's something so satisfying about creating strokes so fine and so intentional that they just disappear into the face. When clients see their healed results for the first time that reaction is everything to me.",
  },
  nanoCombination: {
    name: "Nano Combination Brows",
    tagline: "Real texture meets soft definition. The sweet spot.",
    emoji: "✨",
    color: C.gold,
    education: "Nano combination brows are exactly what the name says a combination of two techniques working together. Individual nano hairstrokes are placed through the front and head of the brow to create natural-looking texture and dimension. Then soft ombre powder shading is blended through the body and tail to add definition, shape and longevity. One of the best things about this technique is that it can be customized to be as soft and subtle or as defined and dense as you'd like. It's completely up to you and we decide together during your consultation. Keep in mind that the work heals much softer and more blended into the skin than it looks immediately after your appointment. By around week 4 you'll start seeing your true healed result and results do lighten about 30 to 40 percent once fully healed. The result is a brow that looks completely real up close but polished and structured from a distance.",
    body: "You want brows that look real and effortless but with just a little more structure and polish like your best brow day, every single day. That's nano combination. Hair strokes through the front give you that completely natural look up close while soft dimensional shading through the body adds definition, shape and longevity. The result is a brow that looks real from every angle and polished from across the room. And here's what most people don't realize the right brow structure is one of the most powerful nonsurgical transformations that exists. The right arch, the right tail, the right shape changes the entire face. It lifts the features. It opens the eyes. It creates results people notice without ever knowing why.",
    details: [
      { label: "Technique", value: "Nano hairstrokes combined with soft ombre shading" },
      { label: "Best For", value: "Most skin types especially combination, normal and some oily" },
      { label: "Longevity", value: "2 to 3 years depending on skin type, lifestyle and genetics" },
      { label: "Healing", value: "10 to 14 days for the full result to develop" },
      { label: "Pain Level", value: "Low to mild. The sensation is more annoying than painful and numbing is used throughout" },
      { label: "Perfecting Session", value: "6 to 8 weeks after your first appointment. Most clients then go 2 to 3 years before a refresh" },
    ],
    perfect: ["You want natural texture AND soft definition", "You want results that look real up close", "You want brows that photograph beautifully", "You want the best of both worlds", "You're ready for the most complete result"],
    note: "Nano combination is honestly my most booked technique and for good reason it suits almost everyone. The way the hairstrokes and shading come together to create one seamless brow is genuinely artistic. Every time I finish a combination result I remember exactly why I love this work.",
  },
  softOmbre: {
    name: "Soft Ombre Powder Brows",
    tagline: "Effortless definition that holds through everything.",
    emoji: "🌸",
    color: C.dusty,
    education: "Soft ombre powder brows use a machine to deposit soft pixelated shading into the skin, creating a gradient effect that's lighter at the front and gradually deeper through the body and tail. This style can be customized to be as soft and natural or as defined and dense as you'd like. We decide together based on your preference and what's going to look most beautiful on your face. The work heals much softer and more blended into the skin than it looks right after your appointment. By around week 4 your true healed result starts to show and the colour lightens about 30 to 40 percent once fully healed. This technique is ideal for skin types that don't hold hairstrokes as well, like oily, mature, sensitive or reactive skin. It's also the gentlest option for those with very minimal natural hair since the shape itself does all the work.",
    body: "Imagine waking up and already looking like you have somewhere important to be. That's soft ombre powder brows. Soft, dimensional and perfectly defined without a single product, mirror or moment of effort. Just you, fully put together, walking out the door like the woman you've always been becoming. This technique was made for the woman who lives at full speed and refuses to let her appearance slow her down. And here's what most women don't know a well-mapped brow does something no serum or treatment can replicate. It lifts the entire face. The right arch, the right structure, the right definition changes everything. It's the most underrated nonsurgical transformation available to women today. Most clients go 2 to 3 years before needing a refresh. This isn't a luxury it's the smartest thing in your beauty routine.",
    details: [
      { label: "Technique", value: "Soft pixelated ombre shading applied by machine" },
      { label: "Best For", value: "Oily, combination, mature, sensitive or reactive skin" },
      { label: "Longevity", value: "2 to 3 years depending on skin type, lifestyle and genetics" },
      { label: "Healing", value: "7 to 14 days. Colour lightens 30 to 40 percent as it heals" },
      { label: "Pain Level", value: "Low to mild. Feels more like an annoying sensation than actual pain. Very manageable" },
      { label: "Perfecting Session", value: "6 to 8 weeks after your first appointment. Then most clients comfortably go 2 to 3 years" },
    ],
    perfect: ["You have oily, combination, mature or sensitive skin", "You want defined polished brows daily", "You're active and need something that holds", "You want low maintenance luxury", "You want brows that survive everything"],
    note: "Soft ombre is the technique I reach for when I want to make sure a client's results are absolutely going to last and look beautiful on their skin. There's something so powerful about knowing your brows will look perfect whether you're in a boardroom or just woke up. That kind of freedom is what permanent makeup is really about.",
  },
  makeupOmbre: {
    name: "Makeup Style Ombre Brows",
    tagline: "Bold, glamorous and completely intentional.",
    emoji: "💄",
    color: C.deep,
    education: "Makeup style ombre is the boldest and most defined version of powder brows. Instead of a soft gradient, the shading is built up with more saturation and depth to create a full, filled-in brow that mimics the look of a perfectly applied brow product. Think of it as your favourite bold brow day made permanent. The shape is crisp, the definition is intentional and the impact is undeniable. This technique works on all skin types and is perfect for the woman who loves a statement brow. It's also a great option for anyone who's been filling in their brows heavily for years and wants that same full look without the daily effort.",
    body: "You want bold, full brows with real presence. The kind that command attention and frame your face like a statement. Makeup style ombre gives you exactly that a defined, filled-in brow with depth, dimension and serious impact. Think of it as your best brow makeup look but permanent. No smudging. No fading by noon. No touching up in the car. Just you, fully done, every single day. This is for the woman who loves a glamorous brow and isn't afraid to own it. The woman who sees her appearance as an extension of her confidence and refuses to apologize for wanting more.",
    details: [
      { label: "Technique", value: "Full ombre shading with deeper pigment saturation for bold definition" },
      { label: "Best For", value: "All skin types especially those who love a more defined makeup look" },
      { label: "Longevity", value: "2 to 3 years depending on skin type, lifestyle and genetics" },
      { label: "Healing", value: "7 to 14 days. Result softens beautifully as it heals" },
      { label: "Pain Level", value: "Low to mild. Numbing is applied and most clients find it very comfortable" },
      { label: "Perfecting Session", value: "6 to 8 weeks after your first appointment. Then most clients go 2 to 3 years before a refresh" },
    ],
    perfect: ["You love a bold glamorous brow", "You want maximum definition and presence", "You're done doing your brows every morning", "You want something that photographs strikingly", "You own your look and love it"],
    note: "I love doing makeup style ombre on the woman who walks in knowing exactly what she wants and owns it completely. There's something so beautiful about creating a brow that perfectly matches the energy and confidence of the person wearing it.",
  },
};

// ─── SCORING ENGINE ──────────────────────────────────────────────
function calcResult(ans, conditions) {
  const { skinType, hairTexture, hairDensity, hairFlow, browGoal, lifestyle, aspiration, skinTone } = ans;
  const hasSensitive = conditions.some(c => ["rosacea", "sundamaged", "mature", "acne"].includes(c));

  let scores = { hairstrokes: 0, nanoCombination: 0, softOmbre: 0, makeupOmbre: 0 };

  // ── SKIN CONDITIONS (hard overrides first)
  if (conditions.includes("rosacea")) { scores.softOmbre += 8; scores.nanoCombination += 2; }
  if (conditions.includes("sundamaged")) { scores.softOmbre += 6; scores.nanoCombination += 4; }
  if (conditions.includes("mature")) { scores.softOmbre += 7; scores.nanoCombination += 3; }
  if (conditions.includes("acne")) { scores.softOmbre += 5; scores.nanoCombination += 4; }

  // ── SKIN TYPE
  if (skinType === "dry") { scores.hairstrokes += 4; scores.nanoCombination += 3; scores.softOmbre += 1; }
  if (skinType === "normal") { scores.hairstrokes += 4; scores.nanoCombination += 3; scores.softOmbre += 2; }
  if (skinType === "combo") { scores.nanoCombination += 4; scores.softOmbre += 3; scores.hairstrokes += 2; }
  if (skinType === "oily") { scores.softOmbre += 5; scores.nanoCombination += 4; }
  if (skinType === "mature") { scores.softOmbre += 6; scores.nanoCombination += 3; }
  if (skinType === "sensitive") { scores.softOmbre += 5; scores.nanoCombination += 3; }

  // ── HAIR TEXTURE
  if (hairTexture === "soft") {
    // hairstrokes only if even density (checked later), otherwise nanoCombination or softOmbre
    scores.nanoCombination += 4; scores.softOmbre += 3; scores.hairstrokes += 2;
  }
  if (hairTexture === "medium") {
    // works with all styles
    scores.nanoCombination += 4; scores.hairstrokes += 3; scores.softOmbre += 3; scores.makeupOmbre += 2;
  }
  if (hairTexture === "coarse") {
    // soft ombre preferred, combo possible, hairstrokes depends
    scores.softOmbre += 5; scores.nanoCombination += 4; scores.hairstrokes += 1;
  }

  // ── HAIR DENSITY
  if (hairDensity === "full") {
    scores.nanoCombination += 4; scores.softOmbre += 3; scores.hairstrokes += 3;
  }
  if (hairDensity === "sparse") {
    scores.nanoCombination += 5; scores.softOmbre += 4;
  }
  if (hairDensity === "uneven") {
    // missing tail or half brow = combo or ombre only
    scores.nanoCombination += 5; scores.softOmbre += 5; scores.hairstrokes -= 3;
  }
  if (hairDensity === "minimal") {
    // ombre first, nano combo second, NO full hairstrokes
    scores.softOmbre += 7; scores.nanoCombination += 5; scores.hairstrokes -= 10;
  }

  // ── HAIR FLOW
  if (hairFlow === "upward") {
    scores.nanoCombination += 3; scores.hairstrokes += 3; scores.softOmbre += 2;
  }
  if (hairFlow === "flat") {
    // usually combination
    scores.nanoCombination += 4; scores.softOmbre += 3; scores.hairstrokes += 1;
  }
  if (hairFlow === "mixed") {
    // most styles work
    scores.nanoCombination += 4; scores.softOmbre += 3; scores.hairstrokes += 2;
  }

  // ── BROW GOAL
  if (browGoal === "natural") {
    // all hairstrokes, undetectable
    scores.hairstrokes += 8; scores.nanoCombination += 2;
  }
  if (browGoal === "naturalDefined") {
    // combo first, soft ombre second, not full hairstrokes
    scores.nanoCombination += 7; scores.softOmbre += 4; scores.hairstrokes -= 2;
  }
  if (browGoal === "polished") {
    // soft combo or soft ombre
    scores.nanoCombination += 5; scores.softOmbre += 5;
  }
  if (browGoal === "glam") {
    // ombre or makeup style
    scores.makeupOmbre += 8; scores.softOmbre += 5; scores.hairstrokes -= 3;
  }

  // ── LIFESTYLE
  if (lifestyle === "active") { scores.softOmbre += 5; scores.makeupOmbre += 3; }
  if (lifestyle === "polished") { scores.nanoCombination += 4; scores.softOmbre += 4; }
  if (lifestyle === "creative") { scores.nanoCombination += 3; scores.softOmbre += 3; scores.makeupOmbre += 3; }
  if (lifestyle === "lowmaint") { scores.hairstrokes += 5; scores.nanoCombination += 2; }

  // ── ASPIRATION
  if (aspiration === "real") { scores.hairstrokes += 6; scores.nanoCombination += 2; }
  if (aspiration === "effortless") { scores.nanoCombination += 4; scores.softOmbre += 4; scores.hairstrokes += 2; }
  if (aspiration === "bareface") { scores.hairstrokes += 5; scores.nanoCombination += 3; }

  // ── SOFT/FINE + EVEN DENSITY bonus for hairstrokes
  if (hairTexture === "soft" && hairDensity === "full" && hairFlow === "upward") {
    scores.hairstrokes += 4;
  }

  // Sort and return top 2
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { primary: sorted[0][0], secondary: sorted[1][0] };
}

// ─── STYLE ────────────────────────────────────────────────────────
const s = {
  page: { background: C.cream, minHeight: "100vh", fontFamily: "Georgia, serif", color: C.dark, overflowX: "hidden" },
  progress: { position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "rgba(232,180,190,0.2)", zIndex: 999 },
  bar: (pct) => ({ height: "100%", background: `linear-gradient(90deg, ${C.blush}, ${C.gold})`, width: `${pct}%`, transition: "width 0.5s ease" }),
  header: { position: "fixed", top: 0, left: 0, right: 0, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 998, background: `linear-gradient(to bottom, rgba(251,247,244,0.97), transparent)` },
  logo: { fontSize: 15, fontStyle: "italic", color: C.mid, letterSpacing: "0.1em" },
  counter: { fontSize: 11, letterSpacing: "0.2em", color: C.light, textTransform: "uppercase", fontFamily: "sans-serif" },

  // Landing
  landing: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "100px 28px 60px", minHeight: "100vh", justifyContent: "center" },
  eyebrow: { fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: C.dusty, marginBottom: 24, fontFamily: "sans-serif" },
  h1: { fontSize: "clamp(38px,8vw,66px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 8 },
  em: { fontStyle: "italic", color: C.accent },
  subtitle: { fontSize: "clamp(15px,3vw,21px)", fontStyle: "italic", color: C.light, marginBottom: 32, fontWeight: 300 },
  desc: { maxWidth: 500, fontSize: 14, lineHeight: 1.9, color: C.mid, marginBottom: 36, fontFamily: "sans-serif", fontWeight: 300 },
  pills: { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 },
  pill: { fontSize: 11, color: C.mid, background: "rgba(232,180,190,0.15)", border: "1px solid rgba(232,180,190,0.4)", padding: "7px 16px", borderRadius: 100, fontFamily: "sans-serif" },
  startBtn: { background: C.dark, color: C.cream, border: "none", padding: "18px 44px", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif" },
  landingNote: { marginTop: 18, fontSize: 11, color: C.light, fontFamily: "sans-serif", letterSpacing: "0.05em" },

  // Questions
  qScreen: { display: "flex", flexDirection: "column", alignItems: "center", padding: "110px 28px 80px", minHeight: "100vh", justifyContent: "center" },
  qWrap: { maxWidth: 660, width: "100%" },
  qNum: { fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: C.dusty, marginBottom: 14, fontFamily: "sans-serif" },
  qTitle: { fontSize: "clamp(22px,5vw,38px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 8 },
  qHint: { fontSize: 13, color: C.light, marginBottom: 32, fontStyle: "italic", fontFamily: "sans-serif", fontWeight: 300 },
  grid1: { display: "grid", gridTemplateColumns: "1fr", gap: 12 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  card: (sel) => ({ background: sel ? "rgba(192,112,128,0.07)" : "rgba(255,255,255,0.75)", border: `1.5px solid ${sel ? C.accent : "rgba(232,180,190,0.3)"}`, padding: "18px 22px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative" }),
  check: (sel) => ({ position: "absolute", top: 13, right: 13, width: 19, height: 19, borderRadius: "50%", border: `1.5px solid ${sel ? C.accent : "rgba(232,180,190,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, background: sel ? C.accent : "transparent", color: sel ? "white" : "transparent" }),
  optIcon: { fontSize: 18, marginBottom: 7, display: "block" },
  optLabel: { fontSize: 16, fontWeight: 400, color: C.dark, marginBottom: 3 },
  optDesc: { fontSize: 12, color: C.light, lineHeight: 1.6, fontFamily: "sans-serif", fontWeight: 300 },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 },
  backBtn: { background: "transparent", border: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.light, cursor: "pointer", fontFamily: "sans-serif" },
  nextBtn: (on) => ({ background: C.dark, color: C.cream, border: "none", padding: "14px 30px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: on ? "pointer" : "default", fontFamily: "sans-serif", opacity: on ? 1 : 0.3, pointerEvents: on ? "all" : "none" }),

  // Loading
  loadWrap: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, textAlign: "center" },
  loadTitle: { fontSize: 28, fontWeight: 300, fontStyle: "italic", color: C.dark, marginBottom: 8 },
  loadSub: { fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.light, fontFamily: "sans-serif", marginBottom: 36 },
  dots: { display: "flex", gap: 10, marginBottom: 32, justifyContent: "center" },
  dot: (c) => ({ width: 8, height: 8, borderRadius: "50%", background: c }),
  steps: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 300, margin: "0 auto" },
  step: (vis) => ({ fontSize: 12, color: C.light, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 10, letterSpacing: "0.05em", opacity: vis ? 1 : 0, transition: "opacity 0.5s ease" }),
  stepDot: { width: 4, height: 4, borderRadius: "50%", background: C.blush, flexShrink: 0 },

  // Email
  emailWrap: { display: "flex", flexDirection: "column", gap: 16, maxWidth: 460 },
  emailLabel: { fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: C.dusty, marginBottom: 5, display: "block", fontFamily: "sans-serif" },
  emailInput: (err) => ({ background: "rgba(255,255,255,0.8)", border: `1.5px solid ${err ? C.accent : "rgba(232,180,190,0.3)"}`, padding: "14px 16px", fontSize: 14, color: C.dark, outline: "none", width: "100%", fontFamily: "sans-serif", borderRadius: 0, WebkitAppearance: "none" }),
  emailPrivacy: { fontSize: 11, color: C.light, fontStyle: "italic", lineHeight: 1.6, fontFamily: "sans-serif" },
  submitBtn: (sub) => ({ background: C.dark, color: C.cream, border: "none", padding: 18, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", cursor: sub ? "default" : "pointer", fontFamily: "sans-serif", width: "100%", opacity: sub ? 0.6 : 1 }),

  // Result
  resultWrap: { maxWidth: 760, margin: "0 auto", padding: "100px 28px 60px" },
  resEyebrow: { fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: C.dusty, marginBottom: 12, fontFamily: "sans-serif" },
  resHeadline: { fontSize: 15, fontStyle: "italic", color: C.light, marginBottom: 5, fontWeight: 300 },
  resTitle: { fontSize: "clamp(34px,7vw,58px)", fontWeight: 300, lineHeight: 1.05, marginBottom: 5 },
  resTagline: { fontSize: 17, fontStyle: "italic", fontWeight: 300, color: C.dark, marginBottom: 28 },
  resBody: { fontSize: 15, fontWeight: 300, lineHeight: 2, color: C.mid, marginBottom: 40, fontFamily: "sans-serif" },
  detGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 40, background: "rgba(232,180,190,0.2)" },
  detCard: { background: C.warm, padding: "22px 18px" },
  detLabel: { fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: C.dusty, marginBottom: 8, fontFamily: "sans-serif" },
  detVal: { fontSize: 15, color: C.dark, fontWeight: 300, lineHeight: 1.4 },
  secTitle: { fontSize: 18, fontWeight: 400, color: C.dark, marginBottom: 16 },
  perfGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 40 },
  perfItem: { fontSize: 13, color: C.mid, fontFamily: "sans-serif", fontWeight: 300, display: "flex", alignItems: "flex-start", gap: 8 },
  noteBox: (border) => ({ borderLeft: `2px solid ${border}`, padding: "20px 24px", marginBottom: 40, background: "rgba(232,180,190,0.05)" }),
  noteLabel: { fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: C.dusty, marginBottom: 10, fontFamily: "sans-serif" },
  noteText: { fontSize: 16, fontStyle: "italic", lineHeight: 1.7, color: C.dark, fontWeight: 300 },
  noteSig: { fontSize: 13, fontStyle: "italic", color: C.light, marginTop: 12 },
  eduBox: { background: "rgba(232,180,190,0.08)", border: "1px solid rgba(232,180,190,0.25)", padding: "28px 26px", marginBottom: 40 },
  eduTitle: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dusty, marginBottom: 12, fontFamily: "sans-serif" },
  eduText: { fontSize: 14, color: C.mid, lineHeight: 1.9, fontFamily: "sans-serif", fontWeight: 300 },
  photoSection: { marginBottom: 40 },
  photoLabel: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.dusty, marginBottom: 14, fontFamily: "sans-serif" },
  photoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 },
  photoSingle: { width: "100%", display: "block" },
  photoImg: { width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top", display: "block" },
  photoCaption: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.light, textAlign: "center", padding: "8px 0", fontFamily: "sans-serif" },
  altBox: { border: "1.5px solid rgba(232,180,190,0.4)", padding: "26px", marginBottom: 40, background: "rgba(232,180,190,0.04)" },
  guidanceBox: { borderLeft: `2px solid ${C.gold}`, padding: "20px 24px", marginBottom: 40, background: "rgba(201,169,110,0.05)" },

  // CTA
  ctaSection: { background: C.dark, padding: "48px 28px", textAlign: "center", position: "relative" },
  ctaEyebrow: { fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: C.blush, marginBottom: 16, fontFamily: "sans-serif" },
  ctaTitle: { fontSize: "clamp(26px,5vw,46px)", fontWeight: 300, lineHeight: 1.2, color: C.cream, marginBottom: 12 },
  ctaSub: { fontSize: 13, color: "rgba(251,247,244,0.5)", marginBottom: 32, maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.8, fontFamily: "sans-serif", fontWeight: 300 },
  pathsWrap: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 500, margin: "0 auto 28px" },
  path: { display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,180,190,0.15)", padding: "16px 20px", textDecoration: "none", textAlign: "left", cursor: "pointer" },
  pathIcon: { fontSize: 20, flexShrink: 0 },
  pathLabel: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.blush, marginBottom: 2, fontFamily: "sans-serif", fontWeight: 500 },
  pathDesc: { fontSize: 12, color: "rgba(251,247,244,0.5)", lineHeight: 1.5, fontFamily: "sans-serif", fontWeight: 300 },
  avail: { fontSize: 11, color: "rgba(251,247,244,0.35)", fontFamily: "sans-serif", letterSpacing: "0.08em" },
  retakeWrap: { textAlign: "center", padding: "24px 28px" },
  retakeBtn: { background: "transparent", border: "none", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: C.light, cursor: "pointer", fontFamily: "sans-serif" },

  // Divider
  divider: { display: "flex", alignItems: "center", gap: 14, margin: "24px auto", maxWidth: 260 },
  divLine: { flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.blush})` },
  divDiamond: { width: 6, height: 6, background: C.blush, transform: "rotate(45deg)", flexShrink: 0 },
};

// ─── QUESTIONS CONFIG ─────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "skinType", num: 1, total: 9,
    title: "What's your skin type?",
    hint: "This is one of the most important factors it affects how pigment heals and how long your results last",
    cols: 2,
    options: [
      { val: "dry", icon: "🌸", label: "Dry or Normal", desc: "Skin rarely feels greasy, pores are small and you might notice tightness or occasional flakiness" },
      { val: "combo", icon: "🌿", label: "Combination", desc: "T-zone gets oily but the rest stays normal or dry the most common skin type" },
      { val: "oily", icon: "💧", label: "Oily", desc: "Skin looks shiny throughout the day and pores in the brow area tend to be visible" },
      { val: "mature", icon: "🌷", label: "Mature or Thinning", desc: "Skin has lost some elasticity, may be more delicate or crepey" },
      { val: "sensitive", icon: "🫧", label: "Sensitive or Reactive", desc: "Skin reacts easily to products, tends to flush or redden and feels easily irritated" },
    ],
  },
  {
    id: "hairTexture", num: 2, total: 9,
    title: "What's your natural brow hair texture like?",
    hint: "Hair texture plays a huge role in which technique creates the most realistic and seamless result for you",
    cols: 1,
    options: [
      { val: "soft", icon: "🪶", label: "Soft and Fine", desc: "Hair is delicate, lightweight and lays flat easily. Fine brow hair can be a beautiful canvas for the right technique when there's enough of it" },
      { val: "medium", icon: "🌿", label: "Medium Texture", desc: "Hair has good weight and texture without being too stiff or too fine. The most versatile texture that tends to work well with most techniques" },
      { val: "coarse", icon: "〰️", label: "Coarse and Wiry", desc: "Hair is thick, stiff and tends to grow in multiple directions. Can be hard to tame and needs a technique that works with that texture" },
    ],
  },
  {
    id: "hairDensity", num: 3, total: 9,
    title: "How would you describe your brow hair density?",
    hint: "This tells us how much we're enhancing what's already there versus creating structure where it's missing",
    cols: 2,
    options: [
      { val: "full", icon: "🌿", label: "Full and Dense", desc: "Good density overall with visible texture. You've got a strong natural brow to work with" },
      { val: "sparse", icon: "🪶", label: "Sparse or Patchy", desc: "Gaps are visible especially in the head or tail area. Hair is present but thin in certain spots" },
      { val: "uneven", icon: "✨", label: "Uneven or Missing Sections", desc: "Some areas are full but others are significantly sparse like a missing tail, half a brow or very uneven growth throughout" },
      { val: "minimal", icon: "⭐", label: "Very Minimal or None", desc: "Little to no natural brow hair. You're looking to create brows almost entirely from scratch" },
    ],
  },
  {
    id: "hairFlow", num: 4, total: 9,
    title: "How does your brow hair naturally grow?",
    hint: "Hair direction affects how strokes are placed to look the most natural and seamless on your face",
    cols: 1,
    options: [
      { val: "upward", icon: "⬆️", label: "Upward and Fluffy", desc: "Your hair naturally grows upward and you can brush your brows up and they stay lifted. Great natural flow to work with" },
      { val: "flat", icon: "➡️", label: "Flat or Downward", desc: "Hair lays flat or grows slightly downward. It's harder to create a naturally lifted fluffy look without PMU but that's exactly what we can change" },
      { val: "mixed", icon: "↕️", label: "Mixed Directions", desc: "Different sections grow different ways. The head might grow upward while the body grows flat. Super common and very workable" },
    ],
  },
  {
    id: "browGoal", num: 5, total: 9,
    title: "What's your primary brow goal?",
    hint: "Be honest with yourself here this shapes the entire design and technique approach",
    cols: 1,
    options: [
      { val: "natural", icon: "🌿", label: "Completely Natural and Undetectable", desc: "You want results that look like you were just born with perfect brows. Nobody should be able to tell not even up close. Authenticity over everything" },
      { val: "naturalDefined", icon: "✨", label: "Natural Yet Defined", desc: "You want brows that look real and effortless but with noticeable shape, structure and a little more polish. Like your best brow day, every single day" },
      { val: "polished", icon: "💅", label: "Soft and Polished", desc: "You want clear definition and a refined shape. Still soft and wearable but with obvious intentionality. Brows that frame your face beautifully" },
      { val: "glam", icon: "💄", label: "Full and Glamorous", desc: "You want bold, full brows with real presence. You love a statement brow that elevates your whole face. More is more and you completely own it" },
    ],
  },
  {
    id: "lifestyle", num: 6, total: 9,
    title: "How would you describe your lifestyle?",
    hint: "Your daily routine matters more than you'd think it affects how your results heal and how long they last",
    cols: 2,
    options: [
      { val: "active", icon: "🏃🏽‍♀️", label: "Active and On the Go", desc: "Workouts, outdoor activities, sweating regularly. You need something that genuinely keeps up with your pace" },
      { val: "polished", icon: "💼", label: "Professional and Polished", desc: "Corporate or client-facing environment where your appearance matters daily. Low maintenance but high impact" },
      { val: "creative", icon: "🎨", label: "Creative and Expressive", desc: "Your look evolves often. You love beauty, follow trends and want brows that complement whatever direction you go" },
      { val: "lowmaint", icon: "🤍", label: "Low Maintenance Luxury", desc: "You want to wake up and go. Less is always more. Every decision in your routine is about simplifying beautifully" },
    ],
  },
  {
    id: "aspiration", num: 7, total: 9,
    title: "What matters most to you about your results?",
    hint: "This is about who you're becoming not just what you look like right now",
    cols: 1,
    options: [
      { val: "real", icon: "🌿", label: "They look completely real nobody can tell", desc: "The most important thing is authenticity. You want brows that look like they genuinely belong to you and only you" },
      { val: "effortless", icon: "✨", label: "They make me look effortlessly put together", desc: "You want that polished elevated version of yourself the woman who always looks like she has it together without even trying" },
      { val: "bareface", icon: "🤍", label: "They give me the confidence to go bare-faced", desc: "You want the freedom to skip makeup entirely and still feel completely beautiful. Brows that carry your whole face on their own" },
    ],
  },
  {
    id: "skinTone", num: 8, total: 9,
    title: "How would you describe your skin tone?",
    hint: "Every detail helps us get your recommendation just right",
    cols: 1,
    options: [
      { val: "fair", icon: "🤍", label: "Fair to Light", desc: "Very light complexion, skin burns easily in the sun and you may have pink or cool undertones" },
      { val: "light", icon: "🌸", label: "Light to Medium", desc: "Light complexion with warm, neutral or peachy undertones. You tan gradually with some sun exposure" },
      { val: "medium", icon: "✨", label: "Medium to Olive", desc: "Medium complexion with warm or olive undertones. You tan easily and rarely burn" },
      { val: "mediumDark", icon: "🌿", label: "Medium Brown to Dark", desc: "Warm brown complexion with rich undertones. Beautiful depth and warmth in the skin" },
      { val: "deep", icon: "💛", label: "Deep or Rich", desc: "Deep, rich complexion with beautiful warm or cool undertones. The deepest and most melanin-rich skin tones" },
    ],
  },
];

const SKIN_CONDITIONS = [
  { val: "none", icon: "✨", label: "None of these apply my skin is generally healthy", desc: "No significant conditions or concerns in the brow area. Skin heals predictably and holds pigment well" },
  { val: "rosacea", icon: "🌷", label: "Rosacea or Chronic Redness", desc: "Skin flushes easily, appears red or reactive around the brow area and capillaries may be visible" },
  { val: "sundamaged", icon: "☀️", label: "Sun Damaged or Uneven Texture", desc: "Years of sun exposure have created visible texture, pigmentation changes or unevenness in the skin" },
  { val: "mature", icon: "🌸", label: "Mature or Thinning Skin", desc: "Skin has lost some elasticity and may feel more delicate, crepey or thin in the brow area" },
  { val: "acne", icon: "🧴", label: "Acne-Prone or Congested Skin", desc: "Active breakouts or consistently congested skin in the brow area this affects healing timing and technique" },
];

function buildGuidanceNote(primary, secondary, ans, conditions) {
  const p = RESULTS[primary].name;
  const sec = RESULTS[secondary].name;
  const hasSensitive = conditions.some(c => ["rosacea", "sundamaged", "mature", "acne"].includes(c));

  if (hasSensitive) {
    return `Based on your skin conditions, ${p} is the safest and most beautiful starting point for you. ${sec} may also be an option depending on what I find when I see you in person. Every skin is different and I'll always guide you to what's going to give you the best result for your specific situation.`;
  }
  if (ans.hairDensity === "minimal") {
    return `Since you have very minimal natural hair, ${p} is going to give you the most beautiful and realistic result. Full hairstrokes aren't something I'd recommend for very sparse brows the result needs a solid foundation to look its best. ${sec} is also a great option and we can discuss what's going to work best for your specific brows when we connect.`;
  }
  if (ans.hairDensity === "uneven") {
    return `With uneven brow growth or missing sections, ${p} is going to create the most balanced and beautiful result for you. ${sec} is also worth discussing. The final call always depends on what I see when I assess your brows in person but these two options are definitely where we'd start.`;
  }
  return `Your answers point strongly toward ${p} for your skin, hair and goals. ${sec} is a beautiful alternative worth exploring too. The final recommendation always comes down to what I see when I assess your brows in person but you're already walking in with a really clear picture of what you want and that makes everything so much easier.`;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function BrowQuiz() {
  const [screen, setScreen] = useState("landing");
  const [answers, setAnswers] = useState({});
  const [conditions, setConditions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loadStep, setLoadStep] = useState(0);

  useEffect(() => {
    if (screen === "loading") {
      setLoadStep(0);
      const ts = [
        setTimeout(() => setLoadStep(1), 400),
        setTimeout(() => setLoadStep(2), 1000),
        setTimeout(() => setLoadStep(3), 1600),
        setTimeout(() => setLoadStep(4), 2200),
        setTimeout(() => {
          setResult(calcResult(answers, conditions));
          setScreen("result");
          setProgress(100);
        }, 3000),
      ];
      return () => ts.forEach(clearTimeout);
    }
  }, [screen]);

  const goTo = (s, p) => { setScreen(s); if (p !== undefined) setProgress(p); window.scrollTo(0, 0); };

  const currentQ = QUESTIONS[qIdx];
  const selectedVal = currentQ ? answers[currentQ.id] : null;

  const selectSingle = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));

  const toggleCondition = (val) => {
    if (val === "none") { setConditions(["none"]); return; }
    setConditions(prev => {
      const without = prev.filter(v => v !== "none" && v !== val);
      return prev.includes(val) ? (without.length ? without : []) : [...without, val];
    });
  };

  const nextQ = () => {
    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(qIdx + 1);
      setProgress(((qIdx + 2) / 10) * 85);
      window.scrollTo(0, 0);
    } else {
      goTo("q9", (9 / 10) * 85);
    }
  };

  const prevQ = () => {
    if (qIdx > 0) { setQIdx(qIdx - 1); setProgress(((qIdx) / 10) * 85); window.scrollTo(0, 0); }
    else goTo("landing", 0);
  };

  const handleSubmit = async () => {
    setNameErr(""); setEmailErr("");
    if (!name.trim()) { setNameErr("Please enter your first name"); return; }
    if (!email.trim() || !email.includes("@")) { setEmailErr("Please enter a valid email address"); return; }
    setSubmitting(true);

    // Always move forward after 4 seconds max no matter what
    const proceed = () => {
      if (conditions.length === 0) setConditions(["none"]);
      goTo("loading", 95);
    };

    const timeout = setTimeout(proceed, 4000);

    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${MAILERLITE_API_KEY}` },
        body: JSON.stringify({ email, fields: { name }, groups: [MAILERLITE_GROUP_ID] }),
      });
    } catch (_) {}

    clearTimeout(timeout);
    proceed();
  };

  const retake = () => {
    setAnswers({}); setConditions([]); setName(""); setEmail("");
    setNameErr(""); setEmailErr(""); setResult(null); setQIdx(0); setProgress(0);
    goTo("landing", 0);
  };

  // ── LANDING
  if (screen === "landing") return (
    <div style={s.page}>
      <div style={s.progress}><div style={s.bar(progress)} /></div>
      <header style={s.header}><span style={s.logo}>browsbylys_</span></header>
      <div style={s.landing}>
        <div style={s.eyebrow}>Personalized Brow Analysis</div>
        <h1 style={s.h1}>Discover Your<br /><em style={s.em}>Perfect Brow</em></h1>
        <p style={s.subtitle}>A bespoke style guide made just for you</p>
        <div style={s.divider}><div style={s.divLine} /><div style={s.divDiamond} /><div style={{ ...s.divLine, background: `linear-gradient(90deg, ${C.blush}, transparent)` }} /></div>
        <p style={s.desc}>Not all brows are created equal and neither is your skin, your hair or your lifestyle. This in-depth quiz analyzes 9 key factors to match you with the brow style that's genuinely designed for how you live, how you look and who you're becoming.</p>
        <div style={s.pills}>
          {["9 Expert Questions", "Skin and Hair Analysis", "Personalized Results", "Aftercare Guide Included"].map(p => <span key={p} style={s.pill}>{p}</span>)}
        </div>
        <button style={s.startBtn} onClick={() => { setQIdx(0); setProgress(1 / 9 * 85); goTo("questions", 1 / 9 * 85); }}>Begin Your Analysis &rarr;</button>
        <p style={s.landingNote}>Takes less than 2 minutes. Completely free.</p>
      </div>
    </div>
  );

  // ── QUESTIONS 1-7
  if (screen === "questions" && currentQ) return (
    <div style={s.page}>
      <div style={s.progress}><div style={s.bar(progress)} /></div>
      <header style={s.header}><span style={s.logo}>browsbylys_</span><span style={s.counter}>{currentQ.num} of {currentQ.total}</span></header>
      <div style={s.qScreen}>
        <div style={s.qWrap}>
          <div style={s.qNum}>Question {String(currentQ.num).padStart(2, "0")} of {String(currentQ.total).padStart(2, "0")}</div>
          <h2 style={s.qTitle}>{currentQ.title}</h2>
          <p style={s.qHint}>{currentQ.hint}</p>
          <div style={currentQ.cols === 2 ? s.grid2 : s.grid1}>
            {currentQ.options.map(opt => {
              const sel = selectedVal === opt.val;
              return (
                <div key={opt.val} style={s.card(sel)} onClick={() => selectSingle(currentQ.id, opt.val)}>
                  <div style={s.check(sel)}>&#10003;</div>
                  {opt.icon && <span style={s.optIcon}>{opt.icon}</span>}
                  <div style={s.optLabel}>{opt.label}</div>
                  <div style={s.optDesc}>{opt.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={s.nav}>
            <button style={s.backBtn} onClick={prevQ}>&larr; Back</button>
            <button style={s.nextBtn(!!selectedVal)} onClick={() => selectedVal && nextQ()}>Continue &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── QUESTION 8 SKIN CONDITIONS (multi-select)
  if (screen === "q9") return (
    <div style={s.page}>
      <div style={s.progress}><div style={s.bar(progress)} /></div>
      <header style={s.header}><span style={s.logo}>browsbylys_</span><span style={s.counter}>9 of 9</span></header>
      <div style={s.qScreen}>
        <div style={s.qWrap}>
          <div style={s.qNum}>Question 09 of 09</div>
          <h2 style={s.qTitle}>Do any of these apply to your skin?</h2>
          <p style={s.qHint}>Select all that apply this is the most important question for making sure your results are protected. Honesty here truly matters</p>
          <div style={s.grid1}>
            {SKIN_CONDITIONS.map(opt => {
              const sel = conditions.includes(opt.val);
              return (
                <div key={opt.val} style={s.card(sel)} onClick={() => toggleCondition(opt.val)}>
                  <div style={s.check(sel)}>&#10003;</div>
                  <span style={s.optIcon}>{opt.icon}</span>
                  <div style={s.optLabel}>{opt.label}</div>
                  <div style={s.optDesc}>{opt.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={s.nav}>
            <button style={s.backBtn} onClick={() => { setQIdx(QUESTIONS.length - 1); goTo("questions", (8 / 10) * 85); }}>&larr; Back</button>
            <button style={s.nextBtn(true)} onClick={() => goTo("email", (9.5 / 10) * 85)}>Reveal My Results &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── EMAIL CAPTURE
  if (screen === "email") return (
    <div style={s.page}>
      <div style={s.progress}><div style={s.bar(progress)} /></div>
      <header style={s.header}><span style={s.logo}>browsbylys_</span></header>
      <div style={s.qScreen}>
        <div style={s.qWrap}>
          <div style={s.qNum}>Almost There</div>
          <h2 style={s.qTitle}>Your result is ready 🤍</h2>
          <p style={s.qHint}>Enter your details below to reveal your personalized brow guide and be the first to know when I'm in your area</p>
          <div style={s.emailWrap}>
            <div>
              <label style={s.emailLabel}>First Name</label>
              <input style={s.emailInput(!!nameErr)} type="text" placeholder="Your first name" value={name} onChange={e => setName(e.target.value)} autoComplete="given-name" />
              {nameErr && <p style={{ color: C.accent, fontSize: 11, marginTop: 4, fontFamily: "sans-serif" }}>{nameErr}</p>}
            </div>
            <div>
              <label style={s.emailLabel}>Email Address</label>
              <input style={s.emailInput(!!emailErr)} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              {emailErr && <p style={{ color: C.accent, fontSize: 11, marginTop: 4, fontFamily: "sans-serif" }}>{emailErr}</p>}
            </div>
            <p style={s.emailPrivacy}>Your info is completely safe. No spam ever just brow goodness and updates on when I'm coming to your area 🤍</p>
            <button style={s.submitBtn(submitting)} onClick={handleSubmit} disabled={submitting}>
              {submitting ? "One moment..." : "Reveal My Result"} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── LOADING
  if (screen === "loading") return (
    <div style={s.page}>
      <style>{`@keyframes pulse{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
      <div style={s.loadWrap}>
        <p style={s.loadTitle}>Analyzing your answers...</p>
        <p style={s.loadSub}>Building your personal brow profile</p>
        <div style={s.dots}>
          <div style={{ ...s.dot(C.blush), animation: "pulse 1.4s ease-in-out infinite" }} />
          <div style={{ ...s.dot(C.dusty), animation: "pulse 1.4s ease-in-out 0.2s infinite" }} />
          <div style={{ ...s.dot(C.accent), animation: "pulse 1.4s ease-in-out 0.4s infinite" }} />
        </div>
        <div style={s.steps}>
          {["Analyzing skin type and conditions", "Evaluating hair texture and density", "Matching your lifestyle and goals", "Preparing your personalized brow blueprint"].map((step, i) => (
            <div key={i} style={s.step(loadStep > i)}><div style={s.stepDot} />{step}</div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── RESULT
  if (screen === "result" && result) {
    const r = RESULTS[result.primary];
    const r2 = RESULTS[result.secondary];
    const guidanceNote = buildGuidanceNote(result.primary, result.secondary, answers, conditions);
    const matchedPhoto = pickPhoto(result.primary, answers, conditions);

    return (
      <div style={s.page}>
        <div style={s.progress}><div style={s.bar(100)} /></div>
        <header style={s.header}><span style={s.logo}>browsbylys_</span></header>

        <div style={s.resultWrap}>
          <div style={s.resEyebrow}>Your Personalized Result</div>
          <p style={s.resHeadline}>Based on your skin, hair and goals...</p>
          <h2 style={s.resTitle}><em style={{ ...s.em, color: C.dark }}>{r.emoji} {r.name}</em></h2>
          <p style={s.resTagline}>{r.tagline}</p>
          <div style={s.divider}><div style={s.divLine} /><div style={s.divDiamond} /><div style={{ ...s.divLine, background: `linear-gradient(90deg, ${C.blush}, transparent)` }} /></div>

          <div style={s.eduBox}>
            <div style={s.eduTitle}>What Is {r.name}?</div>
            <p style={s.eduText}>{r.education}</p>
          </div>

          <p style={s.resBody}>{r.body}</p>

          <div style={s.detGrid}>
            {r.details.map(d => (
              <div key={d.label} style={s.detCard}>
                <div style={s.detLabel}>{d.label}</div>
                <div style={s.detVal}>{d.value}</div>
              </div>
            ))}
          </div>

          <h3 style={s.secTitle}>This style's made for you if...</h3>
          <div style={{ ...s.perfGrid, marginBottom: 40 }}>
            {r.perfect.map(p => (
              <div key={p} style={s.perfItem}><span style={{ color: C.blush, fontSize: 8, flexShrink: 0 }}>&#10022;</span>{p}</div>
            ))}
          </div>

          <div style={s.noteBox(C.blush)}>
            <div style={s.noteLabel}>A Note from Your Artist</div>
            <div style={s.noteText}>"{r.note}"</div>
            <div style={s.noteSig}>Lys, @browsbylys_</div>
          </div>

          {matchedPhoto && (
            <div style={s.photoSection}>
              <div style={s.photoLabel}>Real Client Result for {r.name}</div>
              {matchedPhoto.before ? (
                <div style={s.photoGrid}>
                  <div style={s.photoSingle}>
                    <img src={matchedPhoto.before} alt="Before" style={s.photoImg} />
                    <div style={s.photoCaption}>Before</div>
                  </div>
                  <div style={s.photoSingle}>
                    <img src={matchedPhoto.after} alt="After" style={s.photoImg} />
                    <div style={s.photoCaption}>After</div>
                  </div>
                </div>
              ) : (
                <div style={s.photoSingle}>
                  <img src={matchedPhoto.after} alt="After" style={{ ...s.photoImg, aspectRatio: "3/4" }} />
                  <div style={s.photoCaption}>After</div>
                </div>
              )}
            </div>
          )}

          <div style={s.altBox}>
            <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: C.dusty, marginBottom: 10, fontFamily: "sans-serif" }}>Also a Strong Match For You</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: C.dark, fontStyle: "italic", marginBottom: 4 }}>{r2.emoji} {r2.name}</div>
            <div style={{ fontSize: 14, fontStyle: "italic", color: C.gold, marginBottom: 12 }}>{r2.tagline}</div>
            <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.8, fontFamily: "sans-serif", fontWeight: 300 }}>{r2.body.substring(0, 240)}...</div>
          </div>

          <div style={s.guidanceBox}>
            <div style={s.noteLabel}>Your Artist's Guidance</div>
            <div style={s.noteText}>"{guidanceNote}"</div>
            <div style={s.noteSig}>Lys, @browsbylys_</div>
          </div>
        </div>

        <div style={s.ctaSection}>
          <div style={s.ctaEyebrow}>Ready to Transform</div>
          <h3 style={s.ctaTitle}>Your brows are<br /><em style={{ fontStyle: "italic", color: C.blush }}>waiting for you</em></h3>
          <p style={s.ctaSub}>Every appointment starts with a thorough in-depth consultation where we talk through your goals, your skin and your lifestyle. From there we move into brow mapping and decide together on the perfect approach. No templates. No guessing. Just brows that are completely designed for you.</p>
          <div style={s.pathsWrap}>
            {[
              { icon: "💌", label: "DM Me on Instagram", desc: "Slide into my DMs at @browsbylys_ and tell me your result. This is the most personal way to start your brow journey.", href: "https://instagram.com/browsbylys_" },
              { icon: "📋", label: "Submit a Booking Inquiry", desc: "Ready to move forward? Fill out my inquiry form and I'll be in touch within 24 to 48 hours to confirm your spot.", href: "https://forms.gle/CVYHJWguwsRhFgFX6" },
              { icon: "🔔", label: "Join the Waitlist", desc: "Not ready yet or not in my current area? Get on my list and you'll be the first to know when I'm coming to you.", href: "https://forms.gle/6cBeNmymquffRQxb9" },
            ].map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noreferrer" style={s.path}>
                <span style={s.pathIcon}>{p.icon}</span>
                <div><div style={s.pathLabel}>{p.label}</div><div style={s.pathDesc}>{p.desc}</div></div>
                <span style={{ color: "rgba(232,180,190,0.4)", marginLeft: "auto", flexShrink: 0 }}>&rarr;</span>
              </a>
            ))}
          </div>
          <p style={s.avail}>Traveling to select markets monthly &nbsp;|&nbsp; <strong style={{ color: C.blush }}>Spots are limited</strong> &nbsp;|&nbsp; Inquire to check availability</p>
        </div>

        <div style={s.retakeWrap}>
          <button style={s.retakeBtn} onClick={retake}>&larr; Retake the Quiz</button>
        </div>
      </div>
    );
  }

  return null;
}
