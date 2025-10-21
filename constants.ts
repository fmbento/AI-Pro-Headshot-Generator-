
import { StyleOption } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'studio',
    title: 'Press-Ready Studio Portrait',
    description: 'Clean background, dramatic lighting, formal pose.',
    prompt: 'A professional, press-ready studio headshot of the person in the photo. The background should be a clean, plain, light grey. The lighting should be dramatic yet professional, like a three-point lighting setup, creating soft shadows to define facial features. The subject should have a formal pose with a natural, confident smile. The final image must be high-resolution and of editorial quality.'
  },
  {
    id: 'founder',
    title: 'Meet the Founder',
    description: 'Warm, approachable, professional tone.',
    prompt: 'A "Meet the Founder" style headshot of the person in the photo. The tone should be warm, approachable, yet professional. Use soft lighting with subtle depth of field to make the subject stand out. The posture should be slightly casual but confident. The background should be a neutral, out-of-focus office or branded wall setting.'
  },
  {
    id: 'about',
    title: 'About Page Photo',
    description: 'Friendly, professional, and clear.',
    prompt: 'An "About Page" headshot of the person in the photo. It should look friendly and professional. Use balanced, bright lighting for clarity. The background should be simple and have minimal distractions, perhaps a clean wall or a softly blurred indoor environment.'
  },
  {
    id: 'podcast',
    title: 'Podcast Media Shot',
    description: 'Seated at a microphone, engaging pose.',
    prompt: 'A media shot of the person in the photo as a podcast host. The subject should be seated at a desk with a professional podcast microphone (e.g., Shure SM7B). The composition should be vibrant and media-ready. The background can be a modern studio setting with subtle branding elements. The pose should be engaging and conversational.'
  },
  {
    id: 'educator',
    title: 'AI Educator',
    description: 'In front of a whiteboard, teaching AI concepts.',
    prompt: 'An "AI Educator" headshot. The subject is in front of a whiteboard filled with faint diagrams and formulas related to artificial intelligence. The person should be in a dynamic pose, as if gesturing or explaining a concept. The setting is bright and academic. The attire should be smart-casual.'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Profile Upgrade',
    description: 'Crisp, professional, with a neutral background.',
    prompt: 'A crisp, professional headshot perfect for a LinkedIn profile. The framing should be a standard head-and-shoulders shot. The background should be a neutral gradient (e.g., shades of grey or blue). The expression should be confident and approachable.'
  },
  {
    id: 'speaker',
    title: 'Conference Speaker',
    description: 'On stage with a blurred audience backdrop.',
    prompt: 'A dynamic shot of the person in the photo as a conference speaker. They are on a stage, with a spotlight effect for emphasis. The background shows a blurred audience and stage lights. The attire is professional, and the pose is dynamic, as if in the middle of a presentation.'
  },
  {
    id: 'startup',
    title: 'Startup Office Vibe',
    description: 'Casual yet professional in a modern office.',
    prompt: 'A headshot with a "startup office vibe". The person is in a modern, stylish office setting with elements like exposed brick, plants, or collaborative spaces in the blurred background. The look is casual yet professional. Use warm tones and natural light.'
  },
  {
    id: 'outdoor',
    title: 'Outdoor Natural Light',
    description: 'Relaxed and authentic in a park or urban setting.',
    prompt: 'An outdoor headshot using natural light. The subject is in a pleasant park or modern urban outdoor setting. The lighting is soft daylight, and there is a shallow depth of field, blurring the background nicely. The expression and pose should be relaxed and authentic.'
  },
  {
    id: 'tech',
    title: 'Tech Innovator',
    description: 'Futuristic background with cool-toned lighting.',
    prompt: 'A "Tech Innovator" style headshot. The background is futuristic and abstract, with subtle tech elements like light trails or geometric patterns. The lighting is cool-toned (using blues and cyans). The pose is confident and visionary.'
  },
  {
    id: 'open',
    title: 'Open Prompt',
    description: 'Provide your own detailed instructions.',
    prompt: ''
  }
];
