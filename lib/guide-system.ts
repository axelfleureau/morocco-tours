// PDF Guide Generation System for Morocco Dreams
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { firestoreService } from './firestore';

export interface GuideContent {
  id?: string;
  title: string;
  subtitle?: string;
  type: 'travel' | 'package' | 'experience' | 'city';
  itemId: string; // ID of the travel/package/experience/city
  content: {
    overview: string;
    highlights: string[];
    itinerary?: Array<{
      day: number;
      title: string;
      description: string;
      activities: string[];
      meals?: string[];
      accommodation?: string;
    }>;
    includes: string[];
    notIncludes?: string[];
    recommendations: {
      whatToBring: string[];
      clothing: string[];
      health: string[];
      cultural: string[];
    };
    emergencyInfo: {
      contacts: Array<{
        name: string;
        phone: string;
        type: 'guide' | 'hotel' | 'emergency' | 'office';
      }>;
      hospitals: Array<{
        name: string;
        address: string;
        phone: string;
      }>;
    };
    localInfo: {
      currency: string;
      language: string[];
      customs: string[];
      tips: string[];
    };
  };
  userId?: string; // For personalized guides
  createdAt: Date;
  updatedAt: Date;
}

export class GuideService {
  // Generate PDF guide with enhanced graphics
  static async generatePDF(guide: GuideContent): Promise<Blob> {
    const pdf = new jsPDF();
    let yPosition = 20;

    // Add header with background color
    pdf.setFillColor(234, 88, 12); // Orange background
    pdf.rect(0, 0, 210, 30, 'F');

    // Title page with better styling
    pdf.setFontSize(28);
    pdf.setTextColor(255, 255, 255); // White text
    pdf.text(guide.title, 20, yPosition);
    yPosition += 15;

    if (guide.subtitle) {
      pdf.setFontSize(16);
      pdf.setTextColor(100, 100, 100);
      pdf.text(guide.subtitle, 20, yPosition);
      yPosition += 20;
    }

    // Overview
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Panoramica', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    const overviewLines = pdf.splitTextToSize(guide.content.overview, 170);
    pdf.text(overviewLines, 20, yPosition);
    yPosition += overviewLines.length * 5 + 10;

    // Check if new page needed
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }

    // Highlights
    pdf.setFontSize(18);
    pdf.setTextColor(234, 88, 12);
    pdf.text('Punti Salienti', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    guide.content.highlights.forEach((highlight, index) => {
      pdf.text(`• ${highlight}`, 25, yPosition);
      yPosition += 7;
    });
    yPosition += 10;

    // Itinerary (if available)
    if (guide.content.itinerary && guide.content.itinerary.length > 0) {
      if (yPosition > 200) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(18);
      pdf.setTextColor(234, 88, 12);
      pdf.text('Itinerario Dettagliato', 20, yPosition);
      yPosition += 15;

      guide.content.itinerary.forEach((day) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        // Day header
        pdf.setFontSize(14);
        pdf.setTextColor(220, 38, 38); // Red color
        pdf.text(`Giorno ${day.day}: ${day.title}`, 20, yPosition);
        yPosition += 8;

        // Description
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        const descLines = pdf.splitTextToSize(day.description, 170);
        pdf.text(descLines, 20, yPosition);
        yPosition += descLines.length * 4 + 5;

        // Activities
        if (day.activities && day.activities.length > 0) {
          pdf.setFontSize(11);
          pdf.setTextColor(100, 100, 100);
          pdf.text('Attività:', 25, yPosition);
          yPosition += 5;
          
          day.activities.forEach((activity) => {
            pdf.text(`  • ${activity}`, 30, yPosition);
            yPosition += 4;
          });
          yPosition += 5;
        }

        yPosition += 5;
      });
    }

    // Recommendations
    if (yPosition > 180) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(18);
    pdf.setTextColor(234, 88, 12);
    pdf.text('Raccomandazioni', 20, yPosition);
    yPosition += 15;

    // What to bring
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Cosa Portare:', 20, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(11);
    guide.content.recommendations.whatToBring.forEach((item) => {
      pdf.text(`• ${item}`, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 10;

    // Emergency info
    if (yPosition > 200) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(18);
    pdf.setTextColor(220, 38, 38);
    pdf.text('Informazioni di Emergenza', 20, yPosition);
    yPosition += 15;

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    guide.content.emergencyInfo.contacts.forEach((contact) => {
      pdf.text(`${contact.name} (${contact.type}): ${contact.phone}`, 20, yPosition);
      yPosition += 6;
    });

    return pdf.output('blob');
  }

  // Save guide to Firestore
  static async saveGuide(guide: Omit<GuideContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      return await firestoreService.create('guides', {
        ...guide,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving guide:', error);
      throw error;
    }
  }

  // Get guide by item ID and type
  static async getGuideByItem(itemId: string, type: string): Promise<GuideContent | null> {
    try {
      const guides = await firestoreService.getWhere<GuideContent>('guides', 'itemId', '==', itemId);
      return guides.find(guide => guide.type === type) || null;
    } catch (error) {
      console.error('Error fetching guide:', error);
      return null;
    }
  }

  // Get user's downloaded guides
  static async getUserGuides(userId: string): Promise<GuideContent[]> {
    try {
      return await firestoreService.getWhere<GuideContent>('user_guides', 'userId', '==', userId);
    } catch (error) {
      console.error('Error fetching user guides:', error);
      return [];
    }
  }

  // Save guide to user's collection
  static async saveToUserGuides(userId: string, guideId: string): Promise<void> {
    try {
      await firestoreService.create('user_guides', {
        userId,
        guideId,
        downloadedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving to user guides:', error);
      throw error;
    }
  }

  // Create sample guides
  static async createSampleGuides(): Promise<void> {
    const sampleGuides: Omit<GuideContent, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: 'Guida Completa: Tour delle Città Imperiali',
        subtitle: 'Marrakech, Fes, Meknes, Rabat',
        type: 'travel',
        itemId: 'imperial-cities-tour',
        content: {
          overview: 'Un viaggio straordinario attraverso le quattro città imperiali del Marocco, ognuna con la sua storia millenaria e caratteristiche uniche.',
          highlights: [
            'Medina di Marrakech (UNESCO)',
            'Università Al Quaraouiyine a Fes',
            'Mausoleo Mohammed V a Rabat',
            'Palazzo Dar Jamai a Meknes'
          ],
          includes: ['Trasporto privato', 'Guide locali', 'Ingressi inclusi'],
          recommendations: {
            whatToBring: ['Scarpe comode', 'Crema solare', 'Cappello'],
            clothing: ['Abbigliamento modesto', 'Strati per serate fresche'],
            health: ['Bere solo acqua in bottiglia', 'Protezione solare'],
            cultural: ['Rispettare le moschee', 'Contrattare nei souq']
          },
          emergencyInfo: {
            contacts: [
              { name: 'Guida principale', phone: '+212 661 234 567', type: 'guide' },
              { name: 'Ufficio Morocco Dreams', phone: '+212 524 123 456', type: 'office' }
            ],
            hospitals: [
              { name: 'Clinique du Sud', address: 'Gueliz, Marrakech', phone: '+212 524 447 999' }
            ]
          },
          localInfo: {
            currency: 'Dirham marocchino (MAD)',
            language: ['Arabo', 'Berbero', 'Francese'],
            customs: ['Salutare con "As-salāmu alaykum"', 'Togliere le scarpe nelle case'],
            tips: ['Contrattare è normale', 'Mance 10-15%', 'Venerdì è giorno di preghiera']
          }
        }
      }
    ];

    for (const guide of sampleGuides) {
      await this.saveGuide(guide);
    }
  }
}