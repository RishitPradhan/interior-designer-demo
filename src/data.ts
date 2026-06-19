import { ServiceItem, GalleryItem, BeforeAfterProject } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    name: "Full Home Interiors",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHOnjbhAqVYHZV7i02lze6-ptWXCEC4hkI8M4vGBeFjeBwj4Mn0eaQCUW1hmUuYw643-b_DUWyuNykjpBfzdAA0kq68wBu459d8akKTSrR-wyfzu4DpA_U7ezUxUa3emJ_YCMNJbFkg2smRMa_-3SMjYIZPdDtl9ZEN8e6IPmBhMu6grkeyWNlZbg9ZikaSdANEGGhwLFoBSgQg4O9KmkYC9b5-2tXgp1vAXrzlr3BW1IXqsbZpY0qOGaa3p0T3zKjW-Lv3VfcKdo",
    iconName: "Home"
  },
  {
    id: "serv-2",
    name: "Luxury Interiors",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhPn_h7gcH0-Pitt0QNTv2iyZPKTOEPDaNpXVgln-xYJ3GmBfRnOdOrIqSF3syhLLfJ452Fl-0uF3P3Z-C54-JBP0VxASGKOlLgNwHDyfWrCMsK7snbBIfcW4wwUNaqYt1jFClhZNaWOH6WziXr34pkJFBcPXzs7kFUuX8laIu5iqvgS2lsZZZH5HTyEx2e3SWSfx4zx2s1VOfd1QsVAV6iDmLGAtUTMiTijoOyxpd6squeDP7DSPOiLupYr5obk2kULUdryDQZUg",
    iconName: "Gem"
  },
  {
    id: "serv-3",
    name: "Residential Design",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5G8zJZ_s5GVRCTOwn568hU1OBzJtfCOaAoyXOUERGLZ7kXm4_Vif4IuZLv1bwUJ7XEEXJ8OAG-5YoAbJ19qPJF89hJMTSqIXOuBhuHBu0nOz62ExTtLxwJSJdYM3_eSfj1JJRitm0hEXHtFLQkNJBb3PlkK4ljdldlVw1k_Fi9G912GfCpDMfz2GmAvrII9vfkgff7RuwmOToEhVdnmawOuupRj4F8xtWDd5KPk_GlSYQBfxrAjN6uIu0zhrscmZC-IaIZ_3TS84",
    iconName: "Compass"
  },
  {
    id: "serv-4",
    name: "Commercial Design",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJCcQOJdKutWbNIv_KwcifDl7tzmtzA1HFtrdMq-dAKWUu8BKT115u199gOxR8evdhoJqugX3UJXaeSO-lDTIqqqkz2LezF8CdV3sIfxWGLrpHDEee1pI_AHyz7eUR2w8D438OMSOEaY9Gw0xSiEB2MGbda6xhGVgYgRNgnNmJ9H5arCvoIGe_eIAtotKwp822Zv-VzhN44gFj2iTjklN5iMVrrw0mHAg_b-vrxhAh32uTQcPS9Q5ZbWMVKf40W5i2lPZPCGvKxj0",
    iconName: "Briefcase"
  },
  {
    id: "serv-5",
    name: "Modular Kitchens",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIWW4ZV5K-3fc_hFX9-kQU6jz218R-h_GdjTZdTyNwRPUxLjUkk3pCftMisKAmyB-nNVeWl8VfjmZ1MJyfOWOPm23OjZWfvve1E9hS3qDaYH2nfkHyvwEyxNFo7kULqEfohKy1kFoV539x-6X7Wv--e3dDbn1C-E6-dc9xzMQgQPvfC2A32NxmlMRrcdJfiHa_Zcgi9tdF00shI7re4PzbcKHfWdIph5gXnD0o-diIZPGNVT5NN4Y_SULrH6FPHKWBAFGfjNScZms",
    iconName: "ChefHat"
  },
  {
    id: "serv-6",
    name: "Wardrobes & Storage",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJbfPoSo8LRid_xLFv7V97srgaoC2uidWiWiprxkFEaUsDGlR0rDB58eQ3tb_oWfKj5DR28eXKCN_hOrmt8CCEr_4HHJbcRy-VZ7VuSXXxnx_w9s_XBVmJIBGDu0yZGbjM99hnBD4IfEQgtbeVNds9fm0hgyrQnPwpATG6_SZH3dy_MMyTIi57tpqTAJ9Uyh8i1FEnhDsOMxQaU-lwu_ZzBfIj22ANhv4-PFj5VNB8gvwet4bhHZc3xlmQ18D-r-03SaCO04iy85o",
    iconName: "Archive"
  },
  {
    id: "serv-7",
    name: "Renovation Services",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq-tYjmSUyJyu7mQiiQGYQeXPD2PzmAvbTer2EQajC_hDKb5c3uAfHh-Y5ppjpxexTh_xhGhPwNAsgHPmq0w2sfLyfjT0hotMXaJRGcKxojXXwSeCqLDZx8nembUJf-buxT4q-355AzGOUwwY4sHEMywNzaDiFUTerpjE7p4WOY7_2_sVP9tacAChl-98GrsqvSUN-csmSEqJHOpX_wnkSFp58j03ZpAlhli58QlOvsn2DAHYVILq_J25KhtQhZgS2pSxL_kJKlGI",
    iconName: "Wrench"
  },
  {
    id: "serv-8",
    name: "3D Visualization",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVUPb7lMN6F4MeNHV6g4Wpq8rz0R235ocBrBldDWNNizqhPxmjcTTncI3P_hs3_qvf7eLUMtYiTT7Gx2zejt8jiitmbGhLjrFOktMm-B9eI6bLHYgNA7c4hFK4pMQRIbqa6C-F028_EQBzG1TGeV8lq9TU_aZH9lTd7nHIt68TQt22b-Pn5FN6LNY7MNWi1e6cDiuNdOMAc2D-k1gzgkVDBqpPghE_AKbiUgpeJ2Hv-a9Q0jyuwXIiWA0oPatEpf2bba6LOvBX634",
    iconName: "Layout"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Minimalist Sanctuary",
    category: "Living Room",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdbUgtAVXyOBKg9OoJ2PP-4IilyIazMh64MZuDPoEn2J_3-B4nLP-fDI2kCYcYGq4N8CJ5agQfI561IKaJK_rz23hC9G68oMT30X1jNqX4tNr_GJxPzc7w4pqRVOqNDagbrbzQsoIc7cw2bhcIM4c7o1lbLC9IcbFO7Ix4calJPo2Q5r1XrAP1hwLd2f6YvvjlBBd5JAYQCNjOm_XKFnDGGlY6AiFKtC43VzUFibsR7ddiDop8UnSbIgpg-6R6PDf86Y67hwfzXo0",
    description: "A modern minimalist space with low-profile linen couch under generous natural lighting."
  },
  {
    id: "gal-2",
    title: "Executive Suite",
    category: "Office",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvW8oyDtaqxXBQmaN8H4ZVAH1K_g-Nj32KwiAiMGjc1Emi5zOLf8XrVrvUbu6gOQaK1J3auiBWeYlaqcYQaa3TtaQknOAoID73Gj1k2TsYHG6UG4eBpcgNdZ1FKrt5UtFdOxgfAnNge-R_wsPH0s4-lUJ5rcE0aeOxsXpZzsx6cU7bwxoyL_d8JKy1GrZklXptY7bBxom3We_iOAojOGr2ZNS7bzm-zdR02LviETmqxW3H45K3LVXgGrpyfaSWPxri01sGNKBZWHA",
    description: "Luxurious executive suite with built-in obsidian panels and amber ambient highlights."
  },
  {
    id: "gal-3",
    title: "The Gold Kitchen",
    category: "Kitchen",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5EzBTIpliUD9ZJqbG1kFN1iQr6UltVTtSEhgAYPPK-eq3EdduPJlWn2qySP0LkcZJ8wKPw-7dbJrrEFFz4pIhhT6QaSpMA--9k6iOXdtH-e23kDcXptR58omSQPFT3Z-iWsPdg_wtVFVvBSzpPmq0EPxWvNgYJy7T8rFvYmHX9-3k8vwAY5T8AmWY8aSt0Zq74gXkYxCagtoohCDIsyEcxUC8Ln5WH3xMsT4BU6_R7ILPEBnAJL68hJw1yC_pV9qNUF3wRCeSems",
    description: "A gorgeous stone-washed island contrasted with gold faucets and satin cabinetry."
  },
  {
    id: "gal-4",
    title: "Nocturne Bedroom",
    category: "Bedroom",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPaSwNXMMajxCPbnzByUcdDvT5qZ23PeOCCZtCDyKB1Qj5xInBPQueaPVp6QUDw7JGnh87RF2oBUDe4IhqPCdTu1RPak3tnHOhXUFL7ESAb5knJR-PVKO-Kv3vMFzrjuf_QuvGVd4rD1sMjCKpKq8O0xtnN_KfI3UTAfDodKuk8qzDZYsbsw-_RN5jlIzOUDWQWLCXc01vtscbX0Cb8LgOhKVu8QS1Sqwp6pIkxIE84d-R7FlKELifrZG4IE114uizQRqTkpGarc",
    description: "Serene hotel-inspired bed layout featuring textured micro-cement wall blocks."
  },
  {
    id: "gal-5",
    title: "Urban Loft Living",
    category: "Living Room",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXfIv8IPlEscoivKiVHnribkwp8M_9jRIUX_33I65McwTX4S11EFQLjTgq7Pz9ikMexJA1l0TlZ1G6IiNproijku2aAY2zcSPHQK4VtdLpajx-vXU4fC1e1wp-yBY75_LAXC-pWPC46fvgvM459ATqfeyQh8NIdcDULM7N_VsG4yZ7KILpzlzeAYcWfCQH9O5d7Fw-Acjt9oCV57WyP-yhHj4m4DV-F8lYtafdOQPqzOCpko_O_YtrBTfdk0BY07HurY6cdSLGiRM",
    description: "Bespoke linear leather seating situated against industrial cast concrete."
  },
  // Extra elements to make filtration beautiful
  {
    id: "gal-6",
    title: "Walnut study nook",
    category: "Office",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJCcQOJdKutWbNIv_KwcifDl7tzmtzA1HFtrdMq-dAKWUu8BKT115u199gOxR8evdhoJqugX3UJXaeSO-lDTIqqqkz2LezF8CdV3sIfxWGLrpHDEee1pI_AHyz7eUR2w8D438OMSOEaY9Gw0xSiEB2MGbda6xhGVgYgRNgnNmJ9H5arCvoIGe_eIAtotKwp822Zv-VzhN44gFj2iTjklN5iMVrrw0mHAg_b-vrxhAh32uTQcPS9Q5ZbWMVKf40W5i2lPZPCGvKxj0",
    description: "Compact floating desk integrated in oak vertical slat panels."
  },
  {
    id: "gal-7",
    title: "Onyx Marble Powder",
    category: "Kitchen",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIWW4ZV5K-3fc_hFX9-kQU6jz218R-h_GdjTZdTyNwRPUxLjUkk3pCftMisKAmyB-nNVeWl8VfjmZ1MJyfOWOPm23OjZWfvve1E9hS3qDaYH2nfkHyvwEyxNFo7kULqEfohKy1kFoV539x-6X7Wv--e3dDbn1C-E6-dc9xzMQgQPvfC2A32NxmlMRrcdJfiHa_Zcgi9tdF00shI7re4PzbcKHfWdIph5gXnD0o-diIZPGNVT5NN4Y_SULrH6FPHKWBAFGfjNScZms",
    description: "Contrast of matte black hardware and back-lit natural quartzite."
  },
  {
    id: "gal-8",
    title: "Draped Canopy Suite",
    category: "Bedroom",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhPn_h7gcH0-Pitt0QNTv2iyZPKTOEPDaNpXVgln-xYJ3GmBfRnOdOrIqSF3syhLLfJ452Fl-0uF3P3Z-C54-JBP0VxASGKOlLgNwHDyfWrCMsK7snbBIfcW4wwUNaqYt1jFClhZNaWOH6WziXr34pkJFBcPXzs7kFUuX8laIu5iqvgS2lsZZZH5HTyEx2e3SWSfx4zx2s1VOfd1QsVAV6iDmLGAtUTMiTijoOyxpd6squeDP7DSPOiLupYr5obk2kULUdryDQZUg",
    description: "Sheer premium linens hanging from custom integrated iron ceiling structures."
  }
];

export const PROJECTS: BeforeAfterProject[] = [
  {
    id: "proj-1",
    title: "The Heights Penthouse",
    category: "Villa Project",
    budget: "$120k",
    quote: "Aurelian transformed our vision into a breathtaking reality. Every corner of our home now tells a story of elegance. Their attention to detail is truly unparalleled in the industry.",
    clientName: "Sarah & James Mitchell",
    clientRole: "Homeowners, Austin TX",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEY-9w6SNdfjS8Hm8mVsgnUq5zGLYnjWQ6aCKwP0c4My9G8ejrrAvxIhjV4XlWW5EZdZNizPJMs_0RI3YuVudSXSELVZKuzgF0wc2THm2_cxxaalf74mBiQcu8Z56-d1Ob0bLwsu0QcXJCgpgORZb-5oicYDVQwAh8te4lFzN9A1fk99WC1hSPkXxO9iuN8u6VBp5BzkUHPC_A-Nu4DRZO91tsxIRFm2yZRfUxX3YL7BRszsBFZI5MjC4KagjiRWcOk3HV2uXZGDc",
    beforeNotes: "Dated, low-ceiling arrangement with heavy partition walls, thick brown dense visual trims, and yellow-cast utility spotlights.",
    afterNotes: "A seamless open-concept masterpiece containing Italian Travertine marble tiles, structural invisible pillars, recessed architectural custom track lights, and bespoke walnut storage closets."
  },
  {
    id: "proj-2",
    title: "Neo-Classic Studio",
    category: "Office",
    budget: "$85k",
    quote: "The transition from a sterile shell to a warm, inviting creative studio was seamless. The modular storage solutions they designed have tripled our productivity and aesthetic appeal.",
    clientName: "Robert Sterling",
    clientRole: "Creative Director, Sterling & Co.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMNVhzJSC9oUyeR0jT3GG19aryX1rAOa7qfEeG7lGGP0h5q1PQ4QWstz9lMNOtbRtyNZ0yGxdP3_aXO-yuZVHVg8bBiWiUX9SYX546eLGCA_6udbrfpCe4uMgv17sOyxNIvVQqf-H-6hZLD7l20a2euqR4fjb9n6a2Gt-7S3ylTSpsCPi9snOSJODUUP76EalvDV7fAm8RDIeK8UST0ZAPWUGAdHCZtvXiuky_ZTtkU4HJKgU0Rj2mnZTiLZjRM3lKT9AT1mL-51k",
    beforeNotes: "Bare drywall office unit with visual clutter, fluorescent pane blocks, acoustic tile drop roofs, and cold blue painted outlines.",
    afterNotes: "Crafted office space featuring dynamic soundproof vertical walnut slats, floating concrete workstations, integrated warm light modules, and custom conference islands."
  }
];

export const JOURNEY_STEPS = [
  { step: "01", name: "Consultation", desc: "First meet-up, concept walkthroughs, and personal lifestyle deep dive." },
  { step: "02", name: "Planning", desc: "Precise dimensions, layout drafting, zoning configurations, and scope locks." },
  { step: "03", name: "Concept", desc: "Mood-boarding, raw structural textures, material pairing mockups." },
  { step: "04", name: "3D Visual", desc: "Bespoke high-fidelity architectural previews showcasing precise shadow studies." },
  { step: "05", name: "Material Sourcing", desc: "Joint supplier visits to procure Travertine blocks, rare woods, and linens." },
  { step: "06", name: "Execution", desc: "Onsite white-glove engineering managed by our dedicated architect-in-charge." },
  { step: "07", name: "Handover", desc: "The grand reveal, meticulously styled dressing, and structural handover." }
];

export const DESIGN_STYLE_TIPS = [
  {
    style: "Minimalist",
    tagline: "The Art of Restraint",
    pointers: [
      "Select only 3 primary material finishes to prevent visual fatigue.",
      "Incorporate floor-to-ceiling invisible cabinet systems to tuck clutter completely away.",
      "Anchor layouts with a single mammoth low-profile block sofa in boucle or cashmere."
    ]
  },
  {
    style: "Modern",
    tagline: "Bold Geometry, Timeless Materials",
    pointers: [
      "Contrast cold architectural concrete or marble with warm walnut or oiled oak millwork.",
      "Incorporate integrated architectural LED channel slits to highlight raw wall textures.",
      "Leverage dramatic monolithic stone slabs for fireplaces or dining islands."
    ]
  },
  {
    style: "Classic",
    tagline: "Refined Symbiosis",
    pointers: [
      "Incorporate elegant picture-molding or wainscoting on primary wall zones.",
      "Mix antique metals like aged brass with haptic linen curtains and plush velvet seating.",
      "Maintain strict visual balance through mirrored symmetry across primary anchors."
    ]
  }
];
