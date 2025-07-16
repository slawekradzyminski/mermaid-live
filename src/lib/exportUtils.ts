import { toPng } from 'html-to-image'

export interface ExportOptions {
  filename?: string
  scale?: number
  backgroundColor?: string
  quality?: number
}

export async function exportSvgFromContainer(
  container: HTMLDivElement, 
  options: ExportOptions = {}
): Promise<void> {
  const { 
    filename = 'mermaid-diagram', 
    scale = 2, 
    backgroundColor = '#ffffff',
    quality = 1.0
  } = options

  try {
    // Find the SVG element in the container
    const svgElement = container.querySelector('svg')
    
    if (!svgElement) {
      throw new Error('No SVG diagram found to export')
    }

    // Use html-to-image to convert the SVG container to PNG
    const dataUrl = await toPng(container, {
      backgroundColor,
      pixelRatio: scale,
      quality,
      cacheBust: true,
      style: {
        // Ensure the container is properly sized
        width: 'fit-content',
        height: 'fit-content',
        padding: '20px'
      }
    })

    // Create download link
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Failed to export PNG:', error)
    throw new Error(`Failed to export diagram as PNG: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 