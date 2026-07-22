function TreatmentPlanPanel({ disease, crop, onClose }) {
  // Determine treatment protocol details based on crop/disease
  const getProtocolSteps = () => {
    if (disease.includes('Rust')) {
      return {
        price: 'KES 2,400',
        steps: [
          {
            title: 'Chemical Fungicide Spray',
            desc: 'Apply Tebuconazole 250 EC or Propiconazole at 20ml per 20 Litres of water. Target stems and leaf sheaths to suppress active spore expansion.',
            badge: 'Best Window: Tomorrow 06:00 AM (Low Wind)'
          },
          {
            title: 'Cultural Sanitation',
            desc: 'Prune or rogue heavily infected leaves and stems. Burn affected plant residues post-harvest to minimize seasonal spore carryover.',
            badge: null
          },
          {
            title: 'Crop Rotation & Genetics',
            desc: 'Prepare to rotate wheat blocks with nitrogen-fixing pulses (e.g. beans) next season. Source certified rust-resistant seed cultivars.',
            badge: null
          }
        ]
      }
    } else if (disease.includes('Blight')) {
      return {
        price: 'KES 1,850',
        steps: [
          {
            title: 'Foliar Fungicide Application',
            desc: 'Spray Azoxystrobin + Difenoconazole at 40g per 20 Litres. Ensure complete lower canopy leaf coverage to stop blight progression.',
            badge: 'Best Window: Tomorrow 06:00 AM (Low Wind)'
          },
          {
            title: 'Residue Management & Tillage',
            desc: 'Execute deep conservation tillage to bury old crop stubble. Fungus overwinters on dry stalks; burying accelerates organic decay.',
            badge: null
          },
          {
            title: 'Soil Nutrient Optimization',
            desc: 'Apply potassium-balanced top dressing to strengthen crop leaf tissue cell walls against fungal hyphae penetration.',
            badge: null
          }
        ]
      }
    } else {
      // Default Fallback (Fall Armyworm or general pests)
      return {
        price: 'KES 1,200',
        steps: [
          {
            title: 'Chemical Intervention',
            desc: `Apply Emamectin Benzoate (5% SG) at 10g per 20 Litres of water. Focus nozzle directly into the funnel of the ${crop}.`,
            badge: 'Best Window: Tomorrow 06:00 AM (Low Wind)'
          },
          {
            title: 'Biological Integration',
            desc: 'Wait 48 hours, then introduce parasitic Trichogramma wasps to destroy remaining egg masses organically.',
            badge: null
          },
          {
            title: 'Resistance Management',
            desc: 'If >20% of plants show fresh damage after 5 days, rotate to Spinetoram 120 SC to prevent mutation resistance.',
            badge: null
          }
        ]
      }
    }
  }

  const protocol = getProtocolSteps()

  return (
    <div className="treatment-panel slide-in-bottom">
      <div className="treatment-panel__header">
        <h4>Action Plan: {disease}</h4>
        <button onClick={onClose} className="scan-btn scan-btn--secondary" style={{padding: '0.2rem 0.5rem', width: 'auto'}}>Back</button>
      </div>

      <div className="protocol-steps">
        {protocol.steps.map((step, index) => (
          <div className="protocol-step" key={index}>
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h5>{step.title}</h5>
              <p dangerouslySetInnerHTML={{ __html: step.desc }}></p>
              {step.badge && <span className="badge badge--danger">{step.badge}</span>}
            </div>
          </div>
        ))}
      </div>

      <button className="trade-btn trade-btn--sell" style={{width: '100%', marginTop: '1.5rem', padding: '0.8rem'}}>
        Order Agrovets Delivery ({protocol.price})
      </button>
    </div>
  )
}

export default TreatmentPlanPanel
