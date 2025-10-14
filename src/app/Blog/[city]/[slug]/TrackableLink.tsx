'use client'

export function TrackableLink({ 
  href, 
  hotelName, 
  city, 
  children, 
  className 
}: { 
  href: string
  hotelName: string
  city: string
  children: React.ReactNode
  className: string
}) {
  const handleClick = () => {
    const data = JSON.stringify({ 
      hotelName, 
      city, 
      affiliateUrl: href 
    })
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track-click', data)
    } else {
      fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
        keepalive: true,
      }).catch(err => console.error('Track failed:', err))
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}