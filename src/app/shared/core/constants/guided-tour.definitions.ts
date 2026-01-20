export type SupportedLanguage = 'en' | 'th';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  description: string | string[];
  placement?: TourPlacement;
}

export interface TourLabels {
  next: string;
  back: string;
  exit: string;
  done: string;
}

export interface TourContent {
  steps: TourStep[];
  labels?: Partial<TourLabels>;
}

export type TourKey =
  // | 'flightDisruption'
  // | 'flightDisruptionEvent'
  // | 'flightDisruptionBooking'
  // | 'operationList'
  // | 'operationApproved'
  // | 'operationForm'
  'dashboard';

export const GUIDED_TOUR_DEFINITIONS: Record<
  TourKey,
  Record<SupportedLanguage, TourContent>
> = {
  dashboard: {
    th: {
      steps: [
        {
          id: 'dashboard-overview',
          targetSelector: '#dashboard-tour-hero',
          title: 'ภาพรวมระบบ Nok Care',
          description: [
            'ศูนย์กลางเดียวสำหรับดูภาพรวมการทำงานของระบบทั้งหมดทั้งงานปฏิบัติการและการจัดการเหตุการณ์เที่ยวบิน.',
            'ใช้ปุ่ม Start tour เพื่อสำรวจทุกส่วนที่สำคัญบนหน้านี้ได้อย่างรวดเร็ว.',
          ],
          placement: 'bottom',
        },
        {
          id: 'dashboard-operations',
          targetSelector: '#dashboard-operations-btn',
          title: 'เข้าพื้นที่ Operations',
          description: [
            'กดปุ่มนี้เพื่อเปิดศูนย์รวม Workflow ของทีมปฏิบัติการ เช่นสร้าง/อนุมัติ IROP และติดตามสถานะงาน.',
            'เป็นทางลัดที่เร็วที่สุดหากต้องการเริ่มต้นงานหรือทบทวนคิวงานล่าสุด.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-flight-disruption',
          targetSelector: '#dashboard-flight-btn',
          title: 'ติดตาม Flight Disruption',
          description: [
            'ปุ่ม Irregular Cases จะพาไปยังศูนย์ข้อมูลเหตุการณ์เที่ยวบินเพื่อดู Event, Booking และผู้โดยสารที่ได้รับผลกระทบ.',
            'ใช้เพื่อสืบค้นเคสเร่งด่วนหรือเจาะลึกรายละเอียดการแจ้งเตือนได้ทันที.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-theme-config',
          targetSelector: '#dashboard-theme-config',
          title: 'ปรับธีมและการตั้งค่าหน้าจอ',
          description: [
            'ปุ่มนี้ใช้สำหรับเปิดหน้าตั้งค่า Theme/Appearance ของระบบ เช่นโทนสี รูปแบบการแสดงผล และการปรับค่าหน้าตาแอปให้เหมาะกับการใช้งาน.',
          ],
          placement: 'left',
        },
        {
          id: 'dashboard-manual',
          targetSelector: '#dashboard-manual-entry',
          title: 'อ่านคู่มือและเอกสารประกอบ',
          description: [
            'คลิกปุ่มรูปหนังสือที่มุมขวาบนเพื่อเปิด Manual Sidebar ซึ่งมีคู่มือและ Docs แยกตามหัวข้อ.',
            'หากต้องการรายละเอียดเพิ่มเติมของแต่ละฟีเจอร์ สามารถอ่านคู่มือได้จากที่นี่ทุกเวลา.',
          ],
          placement: 'left',
        },
        {
          id: 'dashboard-permissions',
          targetSelector: '#dashboard-tour-container',
          title: 'สิทธิ์การเข้าถึง (Permissions) ของผู้ใช้',
          description: [
            'เมนูบางอย่างอาจไม่แสดงหรือกดไม่ได้ ขึ้นอยู่กับสิทธิ์ของคุณ.',
            'หากไม่สามารถเข้าถึงการทำงานได้ กรุณาแจ้งทีมผู้ดูแลระบบเพื่อกำหนดสิทธิ์ให้ถูกต้อง.',
          ],
          placement: 'bottom',
        },
      ],
      labels: {
        next: 'ถัดไป',
        back: 'ย้อนกลับ',
        exit: 'ออก',
        done: 'เสร็จสิ้น',
      },
    },
    en: {
      steps: [
        {
          id: 'dashboard-overview',
          targetSelector: '#dashboard-tour-hero',
          title: 'Nok Care overview',
          description: [
            'Your home base to understand how Operations and Flight Disruption fit together.',
            'Use the Start tour button to get a quick walkthrough of the key entry points.',
          ],
          placement: 'bottom',
        },
        {
          id: 'dashboard-operations',
          targetSelector: '#dashboard-operations-btn',
          title: 'Jump into Operations',
          description: [
            'Opens the workspace for building and approving IROP workflows, plus tracking their statuses.',
            'Use it when you need to kick off new work or review the latest queues.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-flight-disruption',
          targetSelector: '#dashboard-flight-btn',
          title: 'Monitor flight disruptions',
          description: [
            'Irregular Cases leads to the disruption center with Events, Bookings, and impacted passengers.',
            'Ideal for drilling into urgent cases or reviewing notification history.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-theme-config',
          targetSelector: '#dashboard-theme-config',
          title: 'Theme & configuration',
          description: [
            'Opens the app appearance/configuration panel (e.g., theme, UI preferences, and display options).',
          ],
          placement: 'left',
        },
        {
          id: 'dashboard-manual',
          targetSelector: '#dashboard-manual-entry',
          title: 'Manuals and docs',
          description: [
            'Click the book icon in the top-right to open the Manual sidebar with topic-based guides.',
            'Use it anytime you want deeper explanations or step-by-step references for each feature.',
          ],
          placement: 'left',
        },
        {
          id: 'dashboard-permissions',
          targetSelector: '#dashboard-tour-container',
          title: 'User access permissions',
          description: [
            'Some menus may be hidden or disabled based on your role.',
            'If you cannot access certain features, please contact the system administrator to adjust your permissions accordingly.',
          ],
          placement: 'bottom',
        },
      ],
    },
  },
};
