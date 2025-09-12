/**
 * Morocco Dreams Design System Guide
 *
 * This component serves as the single source of truth for all design system
 * standards, ensuring consistency across the entire website.
 *
 * Based on the comprehensive style guide provided in the PDF attachment.
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DesignSystemGuide() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
      {/* Typography Hierarchy */}
      <section data-slot="typography-section">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Typography Hierarchy</h2>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">H1 - Hero Titles</h1>
            <code className="text-sm text-muted-foreground">text-4xl md:text-5xl lg:text-6xl font-bold</code>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">H2 - Section Titles</h2>
            <code className="text-sm text-muted-foreground">text-3xl lg:text-4xl font-bold</code>
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-balance">H3 - Subsection Titles</h3>
            <code className="text-sm text-muted-foreground">text-2xl lg:text-3xl font-bold</code>
          </div>
          <div>
            <h4 className="text-lg lg:text-xl font-bold">H4 - Card Titles</h4>
            <code className="text-sm text-muted-foreground">text-lg lg:text-xl font-bold</code>
          </div>
          <div>
            <p className="text-lg lg:text-xl text-pretty leading-relaxed">Body Large - Important content</p>
            <code className="text-sm text-muted-foreground">text-lg lg:text-xl</code>
          </div>
          <div>
            <p className="text-base lg:text-lg text-pretty leading-relaxed">Body Regular - Standard content</p>
            <code className="text-sm text-muted-foreground">text-base lg:text-lg</code>
          </div>
        </div>
      </section>

      {/* Color System */}
      <section data-slot="color-system">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Color System</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <span className="text-sm">Primary (Warm Amber)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full"></div>
                <span className="text-sm">Secondary (Orange)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Semantic Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-background border rounded-full"></div>
                <span className="text-sm">Background</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-card border rounded-full"></div>
                <span className="text-sm">Card</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <span className="text-sm">Muted</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-foreground rounded-full"></div>
                <span className="text-sm">Foreground</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted-foreground rounded-full"></div>
                <span className="text-sm">Muted Foreground</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Button Variants */}
      <section data-slot="button-variants">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Button System</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Primary Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="cta" size="lg">
                CTA Gradient
              </Button>
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Secondary Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Card System */}
      <section data-slot="card-system">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Card System</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Standard Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                This is a standard card with semantic structure using CardHeader, CardTitle, and CardContent components.
              </p>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105">
            <div className="relative h-32 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <CardContent>
              <CardTitle className="mb-2">Experience Card</CardTitle>
              <p className="text-muted-foreground text-sm text-pretty">
                Cards with images and hover effects for experiences and destinations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badge System */}
      <section data-slot="badge-system">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Badge System</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Spacing System */}
      <section data-slot="spacing-system">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Spacing System</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Section Spacing</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <code>py-16 lg:py-24</code> - Standard sections
              </li>
              <li>
                <code>py-20 lg:py-32</code> - Hero sections
              </li>
              <li>
                <code>py-12 lg:py-16</code> - Compact sections
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Container System</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <code>max-w-7xl mx-auto px-4 sm:px-6 lg:px-8</code> - Main containers
              </li>
              <li>
                <code>max-w-6xl mx-auto px-4 sm:px-6 lg:px-8</code> - Content containers
              </li>
              <li>
                <code>max-w-4xl mx-auto px-4 sm:px-6 lg:px-8</code> - Text-focused containers
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility Guidelines */}
      <section data-slot="accessibility-guidelines">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Accessibility Standards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Touch Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Minimum: <code>min-h-[44px] min-w-[44px]</code>
                </li>
                <li>
                  Buttons: <code>px-6 py-3</code> or larger
                </li>
                <li>All interactive elements meet WCAG guidelines</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text & Contrast</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  Primary text: <code>text-foreground</code>
                </li>
                <li>
                  Secondary text: <code>text-muted-foreground</code>
                </li>
                <li>All text meets WCAG AA contrast ratios</li>
                <li>
                  Use <code>text-balance</code> and <code>text-pretty</code>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
