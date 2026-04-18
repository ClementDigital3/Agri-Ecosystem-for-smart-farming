export const cropAdvisories = [
  {
    id: 'sorghum',
    name: 'Sorghum',
    stage: 'Booting',
    moisture: 'Fair',
    action: 'Top-dress after the next light shower.',
    watch: 'Scout twice this week for stem borers.',
    window: 'This week',
  },
  {
    id: 'cowpeas',
    name: 'Cowpeas',
    stage: 'Flowering',
    moisture: 'Good',
    action: 'Keep the field clean and avoid water stress.',
    watch: 'Watch for aphids on tender shoots.',
    window: 'Next 3 days',
  },
  {
    id: 'pigeon-peas',
    name: 'Pigeon peas',
    stage: 'Branching',
    moisture: 'Low',
    action: 'Mulch around rows to hold soil moisture.',
    watch: 'Check young leaves for wilt and pod borer eggs.',
    window: 'Today',
  },
]

export const agriculturalProtocols = [
  {
    id: 'borer-control',
    title: 'Stem Borer Control',
    crop: 'Sorghum / Maize',
    impact: 'High',
    detail: 'Apply granular insecticides (Push-Pull method) into the funnel when 5-10% of plants show leaf "window-paning".',
    tags: ['Biosecurity', 'Treatment']
  },
  {
    id: 'moisture-retention',
    title: 'Moisture Retention Logic',
    crop: 'Across dryland crops',
    impact: 'Critical',
    detail: 'Deploy stone lines or grass mulch before the 30% moisture floor is hit to prevent root-zone thermal shock.',
    tags: ['GDD Optimization', 'Hydration']
  },
  {
    id: 'nutrient-sync',
    title: 'Nutrient Sync Strategy',
    crop: 'Legumes',
    impact: 'Medium',
    detail: 'Foliar spray with Boron and Zinc 1 week after flowering begins to maximize pod-set during the current UV window.',
    tags: ['Brix Boost', 'Yield Max']
  }
]
