import { useState, useEffect } from 'react'

const MODEL_IMAGES: Record<string, string> = {
  'BYD Seagull EV':                  'byd-seagull-ev.webp',
  'BYD Dolphin EV':                  'byd-dolphin-ev.webp',
  'BYD Tang EV':                     'byd-tang-ev.webp',
  'BYD Tang DM-i':                   'byd-tang-dmi.webp',
  'BYD Han EV':                      'byd-han-ev.webp',
  'BYD Atto 3 DM-i Dynamic':         'byd-atto3-dmi.webp',
  'BYD Atto 3 DM-i Premium':         'byd-atto3-dmi.webp',
  'BYD Seal 5 DM-i Dynamic':         'byd-seal5-dmi.webp',
  'BYD Seal 5 DM-i Premium':         'byd-seal5-dmi.webp',
  'BYD Shark 6 DMO Premium':         'byd-shark6-dmo.webp',
  'BYD Shark 6 DMO Advanced':        'byd-shark6-dmo.webp',
  'BYD Sealion 6 DM-i':             'byd-sealion6-dmi.webp',
  'BYD Sealion 5 DM-i':             'byd-sealion5-dmi.webp',
  'BYD eMAX 7 DM-i Standard':        'byd-emax7-dmi.webp',
  'BYD eMAX 7 DM-i Superior Captain':'byd-emax7-dmi.webp',
  'BYD eMAX 9 DM-i Premium':         'byd-emax9-dmi.webp',
  'BYD eMAX 9 DM-i Advanced':        'byd-emax9-dmi.webp',
}

export default function CarHero({ modelName }: { modelName: string }) {
  const [error, setError] = useState(false)

  useEffect(() => setError(false), [modelName])

  const filename = MODEL_IMAGES[modelName]
  if (!filename || error) return null

  const src = `${import.meta.env.BASE_URL}cars/${filename}`

  return (
    <div className="car-hero">
      <img src={src} alt={modelName} onError={() => setError(true)} />
    </div>
  )
}
