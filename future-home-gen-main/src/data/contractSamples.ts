/**
 * Sample Construction Contract for Demo Mode
 * Realistic Indian residential construction agreement with common risk flags
 */

export const SAMPLE_CONTRACT_TEXT = `CONSTRUCTION AGREEMENT

This Construction Agreement ("Agreement") is entered into on 15th March 2024 between:

OWNER: Mr. Rajesh Kumar Sharma, S/O Late Ram Prasad Sharma, residing at 45, MG Road, Whitefield, Bangalore - 560066 ("Owner")

CONTRACTOR: M/s Buildwell Constructions Pvt. Ltd., registered under CIN U45200KA2018PTC109876, having its office at 22, Industrial Layout, Peenya, Bangalore - 560058 ("Contractor")

PROPERTY: Residential plot No. 147, Sector 12, Whitefield, Bangalore - 560066, measuring 2,500 sq ft.

1. SCOPE OF WORK
The Contractor agrees to construct a G+1 residential building of approximately 2,500 sq ft built-up area as per the architectural drawings approved by the Owner. The construction shall include all civil, structural, electrical, plumbing, and finishing works.

2. CONTRACT VALUE
The total contract value is fixed at Rs. 49,00,000/- (Rupees Forty-Nine Lakhs Only). This rate includes all labour, materials, and overheads. Any extra work requested by the Owner shall be charged at actuals with 15% profit margin for the Contractor.

3. PAYMENT SCHEDULE
The Owner shall make payments as follows:
- Mobilization Advance: 20% (Rs. 9,80,000) within 7 days of signing
- Foundation Completion: 15% (Rs. 7,35,000)
- Ground Floor Slab: 15% (Rs. 7,35,000)
- First Floor Slab: 15% (Rs. 7,35,000)
- Brickwork Completion: 10% (Rs. 4,90,000)
- Finishing Works Start: 10% (Rs. 4,90,000)
- Final Completion: 15% (Rs. 7,35,000)

4. COMPLETION TIME
The project shall be completed within 18 months from the date of commencement, subject to force majeure events, material shortages, and weather conditions. Any delay by the Owner in providing approvals or payments shall extend the timeline proportionately.

5. PENALTY FOR DELAY
If the Contractor fails to complete the work within the agreed timeline for reasons solely attributable to the Contractor, a penalty of Rs. 5,000/- per day shall be levied, subject to a maximum of 5% of the contract value (Rs. 2,45,000).

6. MATERIAL SPECIFICATIONS
All materials shall be of standard grade as per IS specifications. The Contractor may substitute equivalent brands at their discretion without prior Owner approval, provided the quality is maintained. Cement: OPC 43 Grade or equivalent. Steel: Fe 415 or equivalent. Bricks: Standard burnt clay.

7. DISPUTE RESOLUTION
Any dispute arising under this Agreement shall first be referred to mutual negotiation for 30 days. If unresolved, disputes shall be settled by arbitration under the Arbitration and Conciliation Act, 1996, with a sole arbitrator appointed by mutual consent. The jurisdiction shall be Bangalore courts.

8. TERMINATION
The Owner may terminate this contract with 30 days written notice. Upon termination, the Contractor shall be paid for all work completed plus 10% of the remaining contract value as termination charges.

9. WARRANTIES
The Contractor provides a warranty of 12 months from completion date for structural defects. Finishing works (paint, tiles, fixtures) are warranted for 6 months only.

10. RETENTION MONEY
The Owner shall retain 5% of each payment as retention money, to be released 6 months after final completion, provided no defects are reported.

11. INSURANCE
The Contractor shall maintain workmen compensation insurance. The Owner is responsible for obtaining building insurance.

12. SUBCONTRACTING
The Contractor reserves the right to subcontract any portion of the work without the Owner's prior consent.

Signed by both parties on 15th March 2024.`;

export interface ContractClause {
  title: string;
  text: string;
  riskLevel: 'low' | 'medium' | 'high';
  simpleSummary: string;
  concern?: string;
  recommendation?: string;
}

export interface ContractAnalysisResult {
  contractType: string;
  parties: { role: string; name: string }[];
  projectSummary: string;
  totalValue: string;
  timeline: string;
  clauses: ContractClause[];
  riskFlags: {
    severity: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    recommendation: string;
  }[];
  paymentTermsSummary: string;
  nextSteps: string[];
  disclaimer: string;
  isDemo: boolean;
}

export const DEMO_ANALYSIS_RESULT: ContractAnalysisResult = {
  contractType: 'Residential Construction Agreement',
  parties: [
    { role: 'Owner', name: 'Mr. Rajesh Kumar Sharma' },
    { role: 'Contractor', name: 'M/s Buildwell Constructions Pvt. Ltd.' },
  ],
  projectSummary: 'G+1 residential building of ~2,500 sq ft on a plot in Whitefield, Bangalore. Contract value: ₹49 Lakhs. Timeline: 18 months.',
  totalValue: '₹49,00,000 (Fixed Price)',
  timeline: '18 months from commencement',
  clauses: [
    {
      title: 'Scope of Work',
      text: 'Clause 1',
      riskLevel: 'low',
      simpleSummary: 'Covers all civil, structural, electrical, plumbing, and finishing works as per approved drawings.',
      concern: 'No clause specifying who bears cost if approved drawings change.',
      recommendation: 'Add a clause defining change order procedures with cost implications.',
    },
    {
      title: 'Payment Schedule',
      text: 'Clause 3',
      riskLevel: 'high',
      simpleSummary: '20% advance payment required upfront, followed by milestone-based payments.',
      concern: '20% mobilization advance (₹9.8L) with no bank guarantee from contractor is a high risk for the owner.',
      recommendation: 'Demand a bank guarantee or performance bond equal to the advance amount before paying.',
    },
    {
      title: 'Material Substitution',
      text: 'Clause 6',
      riskLevel: 'high',
      simpleSummary: 'Contractor can swap materials with "equivalent" brands WITHOUT owner approval.',
      concern: 'This clause gives contractor unilateral right to change materials, opening door to quality reduction.',
      recommendation: 'Strike this clause. Require written owner approval for any material substitution.',
    },
    {
      title: 'Delay Penalty',
      text: 'Clause 5',
      riskLevel: 'medium',
      simpleSummary: '₹5,000/day penalty for contractor delay, capped at 5% of contract (₹2.45 Lakhs).',
      concern: 'Penalty cap of 5% is low. At ₹5,000/day, cap reached in just 49 days — little incentive for long delays.',
      recommendation: 'Increase cap to 10%, or add escalating penalties after 60 days of delay.',
    },
    {
      title: 'Subcontracting',
      text: 'Clause 12',
      riskLevel: 'high',
      simpleSummary: 'Contractor can subcontract any work without owner consent.',
      concern: 'No visibility into who actually builds your home. Quality and accountability become unclear.',
      recommendation: 'Add requirement that all subcontractors be disclosed and approved by owner.',
    },
    {
      title: 'Termination Charges',
      text: 'Clause 8',
      riskLevel: 'medium',
      simpleSummary: 'If owner terminates, they must pay 10% of remaining contract value as termination fee.',
      concern: 'On a ₹49L contract, this could mean paying ₹4.9L even if contractor underperforms.',
      recommendation: 'Link termination charges to contractor fault. If terminated for breach, no fee should apply.',
    },
    {
      title: 'Warranty Period',
      text: 'Clause 9',
      riskLevel: 'medium',
      simpleSummary: '12 months structural warranty, 6 months for finishes.',
      concern: 'Industry standard is 3-5 years for structural defects. 12 months is unusually short.',
      recommendation: 'Negotiate minimum 3-year structural warranty and 1-year warranty on finishes.',
    },
    {
      title: 'Dispute Resolution',
      text: 'Clause 7',
      riskLevel: 'low',
      simpleSummary: 'Disputes go to negotiation first, then arbitration in Bangalore.',
      concern: 'No mention of who bears arbitration costs or timeline for resolving disputes.',
      recommendation: 'Add provisions for emergency injunctive relief (e.g., to stop work if major breach occurs).',
    },
  ],
  riskFlags: [
    {
      severity: 'high',
      title: '20% Advance with No Bank Guarantee',
      description: 'Paying ₹9.8 Lakhs upfront without any financial security (bank guarantee or performance bond) exposes owner to loss if contractor defaults, abandons project, or goes insolvent.',
      recommendation: 'Require a bank guarantee equal to advance amount before disbursement. Alternatively, reduce advance to 10%.',
    },
    {
      severity: 'high',
      title: 'Unilateral Material Substitution (Clause 6)',
      description: 'Contractor can change materials without owner approval. "Equivalent" is subjective and can be misused to cut costs at your expense.',
      recommendation: 'Delete this clause or replace with: "All material substitutions require written owner approval 7 days in advance."',
    },
    {
      severity: 'high',
      title: 'Subcontracting Without Consent (Clause 12)',
      description: 'No requirement to disclose subcontractors. This removes accountability and makes quality oversight difficult.',
      recommendation: 'Require written disclosure and approval of any subcontractor before they start work.',
    },
    {
      severity: 'medium',
      title: 'Low Delay Penalty Cap',
      description: 'Penalty capped at 5% (₹2.45L) means contractor has no incentive to avoid delays beyond 49 days. Construction overruns in India average 6-12 months.',
      recommendation: 'Increase cap to 10% or negotiate milestone-specific penalties for critical stages.',
    },
    {
      severity: 'medium',
      title: 'Short Structural Warranty (12 months)',
      description: 'BIS and NBC standards recommend 3-5 year structural warranties. 12 months is insufficient for detecting long-term issues like seepage, cracks, or settlement.',
      recommendation: 'Negotiate 3-year structural warranty as minimum. Industry standard in quality contracts.',
    },
    {
      severity: 'low',
      title: 'No Dispute Timeline in Arbitration',
      description: 'Arbitration clause does not specify timeline for resolution or interim relief provisions.',
      recommendation: 'Add clause: "Arbitration to be completed within 6 months. Either party may seek interim relief from courts."',
    },
  ],
  paymentTermsSummary: '7-stage milestone payments. 20% advance is high risk without security. Retention of 5% per payment released after 6 months is standard and fair.',
  nextSteps: [
    'Consult a construction lawyer before signing — fee ₹5,000-15,000',
    'Demand bank guarantee for advance payment from contractor',
    'Strike Clause 6 (material substitution) and Clause 12 (unconsented subcontracting)',
    'Negotiate structural warranty to minimum 3 years',
    'Add explicit change order procedure with cost estimates before any variation work begins',
    'Verify contractor\'s GST registration, PAN, and previous project references',
    'Confirm contractor holds valid contractor license (Class A or B as applicable)',
  ],
  disclaimer: '⚠️ This analysis is for informational purposes only and does NOT constitute legal advice. Always consult a qualified construction lawyer before signing any contract. Contract law varies by jurisdiction.',
  isDemo: true,
};
