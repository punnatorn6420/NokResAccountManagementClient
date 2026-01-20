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
  'dashboard'
  | 'passwordRotationLogs'
  | 'agentsManagement'
  | 'agentDetail';

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
          title: 'ภาพรวมระบบ NokRes Account Management',
          description: [
            'หน้านี้คือจุดเริ่มต้นสำหรับงานดูแลบัญชีตัวแทน (Agents) และบัญชี RES ที่เกี่ยวข้อง.',
            'คุณสามารถอ่านภาพรวมของบริการหลักทั้งหมดได้ในหน้าเดียวก่อนเข้าไปทำงานเชิงลึกในแต่ละโมดูล.',
          ],
          placement: 'bottom',
        },
        {
          id: 'dashboard-start',
          targetSelector: '#dashboard-tour-start',
          title: 'เริ่มต้น Tour อย่างรวดเร็ว',
          description: [
            'กดปุ่มนี้เมื่อใดก็ได้เพื่อเริ่มทัวร์แนะนำส่วนสำคัญของหน้า Dashboard.',
            'เหมาะสำหรับผู้ใช้ใหม่ที่ต้องการรู้ว่าควรเข้าไปจัดการ Agent, RES account และประวัติการเปลี่ยนรหัสผ่านตรงไหน.',
          ],
          placement: 'bottom',
        },
        {
          id: 'dashboard-agents',
          targetSelector: '#dashboard-tour-agents',
          title: 'ดูแลข้อมูล Agent',
          description: [
            'เมนูจัดการ Agent ใช้สำหรับสร้างและอัปเดตข้อมูลบริษัทตัวแทน เช่น Company Name, Agency Code, Currency และ Contact.',
            'ข้อมูลเหล่านี้เป็นพื้นฐานสำหรับการผูกบัญชี RES และใช้ตรวจสอบสิทธิ์การเข้าถึงในระบบ.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-res-accounts',
          targetSelector: '#dashboard-tour-res-accounts',
          title: 'ควบคุมบัญชี RES',
          description: [
            'โมดูล RES Account Control ช่วยให้กำหนดบัญชีหลัก (Primary) และดูข้อมูลการเข้าถึงของตัวแทนแต่ละราย.',
            'เมื่อมีการรีเซ็ตรหัสผ่าน คุณสามารถตรวจสอบรายการล่าสุดจากหน้าประวัติการหมุนรหัสผ่านได้ทันที.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-audit',
          targetSelector: '#dashboard-tour-audit',
          title: 'ติดตาม Audit และประวัติการเปลี่ยนรหัสผ่าน',
          description: [
            'ส่วนนี้ช่วยให้คุณตรวจสอบกิจกรรมสำคัญ เช่นการรีเซ็ตรหัสผ่าน และสถานะว่า Success/Failed.',
            'ใช้ข้อมูลนี้เพื่อติดตามความปลอดภัยและการแก้ไขปัญหาของบัญชีตัวแทน.',
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
          title: 'NokRes Account Management overview',
          description: [
            'This page is the home base for managing Agent profiles and their RES account access.',
            'Review the core modules here before diving into detailed management screens.',
          ],
          placement: 'bottom',
        },
        {
          id: 'dashboard-start',
          targetSelector: '#dashboard-tour-start',
          title: 'Launch the quick tour',
          description: [
            'Click this button any time to replay the guided tour for the Dashboard.',
            'It is a fast way to learn where Agent management, RES account control, and audit logs live.',
          ],
          placement: 'bottom',
        },
        {
          id: 'dashboard-agents',
          targetSelector: '#dashboard-tour-agents',
          title: 'Agent management entry point',
          description: [
            'Use Agent Management to create and maintain company profiles, agency codes, and contact details.',
            'These details power permission checks and link to RES account provisioning.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-res-accounts',
          targetSelector: '#dashboard-tour-res-accounts',
          title: 'RES account control',
          description: [
            'Manage primary RES accounts and verify access readiness for each Agent.',
            'Cross-check these records when a password reset is requested or a credential issue appears.',
          ],
          placement: 'top',
        },
        {
          id: 'dashboard-audit',
          targetSelector: '#dashboard-tour-audit',
          title: 'Audit and rotation history',
          description: [
            'Review password rotation results (Success/Failed) and administrative actions for traceability.',
            'Use this information to track compliance and investigate access issues quickly.',
          ],
          placement: 'bottom',
        },
      ],
    },
  },
  passwordRotationLogs: {
    th: {
      steps: [
        {
          id: 'password-rotation-overview',
          targetSelector: '#password-rotation-tour-container',
          title: 'ภาพรวมประวัติการหมุนรหัสผ่าน',
          description: [
            'หน้านี้ใช้ติดตามผลการรีเซ็ตรหัสผ่านของบัญชี RES ที่ถูกเรียกใช้งานในระบบ.',
            'คุณสามารถดูสถานะ Success/Failed พร้อมผู้ดำเนินการและเวลาได้จากตารางด้านล่าง.',
          ],
          placement: 'bottom',
        },
        {
          id: 'password-rotation-refresh',
          targetSelector: '#password-rotation-tour-refresh',
          title: 'รีเฟรชข้อมูลล่าสุด',
          description: [
            'กด Refresh now เพื่อดึงข้อมูลประวัติการหมุนรหัสผ่านล่าสุดจากระบบ.',
            'เหมาะสำหรับตรวจสอบหลังจากทำการรีเซ็ตรหัสผ่านหรือแก้ไขปัญหาให้ Agent แล้ว.',
          ],
          placement: 'left',
        },
        {
          id: 'password-rotation-search',
          targetSelector: '#password-rotation-tour-search',
          title: 'ค้นหา Log ด้วยคำสำคัญ',
          description: [
            'ค้นหาได้จาก Account ID, Status, ข้อความใน Log หรือวันที่สร้างรายการ.',
            'ตัวอย่างเช่นค้นคำว่า “Success” หรือเลขบัญชีเพื่อกรองรายการที่ต้องการอย่างรวดเร็ว.',
          ],
          placement: 'bottom',
        },
        {
          id: 'password-rotation-table',
          targetSelector: '#password-rotation-tour-table',
          title: 'ตารางประวัติการหมุนรหัสผ่าน',
          description: [
            'ตารางนี้แสดงรายการ Log ทั้งหมด พร้อมข้อความสรุปและสถานะการทำงาน.',
            'เรียงดูจากคอลัมน์ Account ID, Status และ Created At เพื่อระบุเหตุการณ์สำคัญได้ทันที.',
          ],
          placement: 'top',
        },
        {
          id: 'password-rotation-status',
          targetSelector: '#password-rotation-tour-status',
          title: 'สถานะของการรีเซ็ตรหัสผ่าน',
          description: [
            'สถานะช่วยให้รู้ว่าการเปลี่ยนรหัสผ่านสำเร็จหรือเกิดข้อผิดพลาด (Failed/Pending).',
            'หากพบสถานะ Failed ให้ตรวจสอบข้อความ Log หรือทำการรีเซ็ตซ้ำตามขั้นตอน.',
          ],
          placement: 'top',
        },
        {
          id: 'password-rotation-view',
          targetSelector: '#password-rotation-tour-view',
          title: 'เปิดอ่านข้อความรายละเอียด',
          description: [
            'ใช้ปุ่ม View เพื่อดูข้อความเต็มของ Log เช่นเวลาที่เรียกใช้บริการหรือข้อความจากระบบ.',
            'รายละเอียดนี้ช่วยวิเคราะห์สาเหตุเมื่อมีปัญหาหรือจำเป็นต้องเก็บหลักฐานการทำงาน.',
          ],
          placement: 'left',
        },
        {
          id: 'password-rotation-last-refreshed',
          targetSelector: '#password-rotation-tour-last-refreshed',
          title: 'เวลาที่รีเฟรชล่าสุด',
          description: [
            'แสดงเวลาล่าสุดที่ระบบดึงข้อมูล Log มาแสดงผล.',
            'ช่วยให้คุณมั่นใจว่าข้อมูลที่เห็นอยู่เป็นข้อมูลล่าสุดหรือไม่.',
          ],
          placement: 'top',
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
          id: 'password-rotation-overview',
          targetSelector: '#password-rotation-tour-container',
          title: 'Password rotation overview',
          description: [
            'This page tracks RES password reset activities initiated in the system.',
            'Review Success/Failed outcomes along with the operator and timestamps in the table below.',
          ],
          placement: 'bottom',
        },
        {
          id: 'password-rotation-refresh',
          targetSelector: '#password-rotation-tour-refresh',
          title: 'Refresh the latest logs',
          description: [
            'Click Refresh now to pull the latest password rotation logs from the backend.',
            'Use it right after performing a reset or troubleshooting a credential issue.',
          ],
          placement: 'left',
        },
        {
          id: 'password-rotation-search',
          targetSelector: '#password-rotation-tour-search',
          title: 'Search by keyword',
          description: [
            'Filter logs by account ID, status, log message, or date keywords.',
            'Try searching for “Success” or a specific account number to narrow the results.',
          ],
          placement: 'bottom',
        },
        {
          id: 'password-rotation-table',
          targetSelector: '#password-rotation-tour-table',
          title: 'Rotation history table',
          description: [
            'The table lists each log entry with its summary message and status.',
            'Use the Account ID, Status, and Created At columns to spot critical events quickly.',
          ],
          placement: 'top',
        },
        {
          id: 'password-rotation-status',
          targetSelector: '#password-rotation-tour-status',
          title: 'Status indicators',
          description: [
            'Status tells you whether the rotation succeeded, failed, or is pending.',
            'If a log is Failed, open the message to review details before retrying.',
          ],
          placement: 'top',
        },
        {
          id: 'password-rotation-view',
          targetSelector: '#password-rotation-tour-view',
          title: 'View full log details',
          description: [
            'Use the View action to open the full log message in a dialog.',
            'This is helpful for capturing system responses and troubleshooting issues.',
          ],
          placement: 'left',
        },
        {
          id: 'password-rotation-last-refreshed',
          targetSelector: '#password-rotation-tour-last-refreshed',
          title: 'Last refreshed timestamp',
          description: [
            'Shows the most recent time the log list was refreshed.',
            'Confirm this timestamp when you need to ensure the data is current.',
          ],
          placement: 'top',
        },
      ],
    },
  },
  agentsManagement: {
    th: {
      steps: [
        {
          id: 'agents-management-overview',
          targetSelector: '#agents-management-tour-container',
          title: 'ภาพรวมการจัดการ Agent',
          description: [
            'หน้านี้ใช้ดูรายชื่อ Agent ทั้งหมด พร้อมข้อมูลบริษัท, รหัส Agency และสถานะการจัดการ.',
            'คุณสามารถค้นหา แยกกลุ่ม และเข้าไปดูรายละเอียดของแต่ละ Agent ได้จากที่นี่.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agents-management-refresh',
          targetSelector: '#agents-management-tour-refresh',
          title: 'รีเฟรชข้อมูล Agent',
          description: [
            'กด Refresh now เพื่อดึงข้อมูล Agent ล่าสุดจากระบบ.',
            'เหมาะเมื่อมีการสร้างหรือแก้ไข Agent ใหม่และต้องการเห็นผลทันที.',
          ],
          placement: 'left',
        },
        {
          id: 'agents-management-create',
          targetSelector: '#agents-management-tour-create',
          title: 'สร้าง Agent ใหม่',
          description: [
            'ใช้ปุ่ม Create Agent เพื่อเพิ่มบริษัทตัวแทนใหม่เข้าระบบ.',
            'เตรียมข้อมูลสำคัญ เช่น Company Name, Agency Code, Currency และข้อมูลติดต่อก่อนสร้าง.',
          ],
          placement: 'left',
        },
        {
          id: 'agents-management-search',
          targetSelector: '#agents-management-tour-search',
          title: 'ค้นหาและกรองรายการ',
          description: [
            'ค้นหาได้จาก Company Name, Agency Code หรืออีเมลของ Agent.',
            'เหมาะสำหรับการค้นหาบริษัทเฉพาะ หรือดูผลลัพธ์ที่ตรงกับคีย์เวิร์ด.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agents-management-sort',
          targetSelector: '#agents-management-tour-sort',
          title: 'สลับการเรียงลำดับ',
          description: [
            'ปุ่มนี้ใช้สลับลำดับการแสดงข้อมูลระหว่าง Ascending และ Descending.',
            'ช่วยให้จัดเรียงผลลัพธ์ตามวันที่หรือข้อมูลที่ต้องการเห็นก่อน.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agents-management-table',
          targetSelector: '#agents-management-tour-table',
          title: 'ตารางรายการ Agent',
          description: [
            'ตารางนี้แสดงรายละเอียดหลัก เช่น Company Name, Agency Code, Currency และ Assigned By.',
            'ใช้เพื่อประเมินข้อมูลของ Agent ก่อนเข้าดูรายละเอียดหรือแก้ไข.',
          ],
          placement: 'top',
        },
        {
          id: 'agents-management-actions',
          targetSelector: '#agents-management-tour-actions',
          title: 'การเข้าดูและแก้ไขโปรไฟล์',
          description: [
            'ในคอลัมน์ Actions คุณสามารถกดดูรายละเอียด (View) หรือแก้ไข (Edit) โปรไฟล์ Agent.',
            'เหมาะสำหรับการตรวจสอบข้อมูล หรืออัปเดตเบอร์โทร/ผู้รับผิดชอบอย่างรวดเร็ว.',
          ],
          placement: 'top',
        },
        {
          id: 'agents-management-paginator',
          targetSelector: '#agents-management-tour-paginator',
          title: 'การแบ่งหน้า',
          description: [
            'เลือกจำนวนแถวที่ต้องการแสดง หรือเลื่อนไปหน้าถัดไปได้จากตัวแบ่งหน้า.',
            'ช่วยให้จัดการข้อมูลจำนวนมากได้ง่ายขึ้น.',
          ],
          placement: 'top',
        },
        {
          id: 'agents-management-last-refreshed',
          targetSelector: '#agents-management-tour-last-refreshed',
          title: 'เวลาที่รีเฟรชล่าสุด',
          description: [
            'แสดงเวลาที่ระบบดึงข้อมูล Agent ล่าสุด.',
            'ใช้ตรวจสอบว่าข้อมูลที่เห็นอยู่เป็นข้อมูลปัจจุบันหรือไม่.',
          ],
          placement: 'top',
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
          id: 'agents-management-overview',
          targetSelector: '#agents-management-tour-container',
          title: 'Agents management overview',
          description: [
            'This page lists every Agent profile with key company and contact information.',
            'Use it to locate an Agent quickly, review their data, and open detail screens.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agents-management-refresh',
          targetSelector: '#agents-management-tour-refresh',
          title: 'Refresh the list',
          description: [
            'Click Refresh now to pull the latest Agent data from the server.',
            'Useful right after creating or updating an Agent record.',
          ],
          placement: 'left',
        },
        {
          id: 'agents-management-create',
          targetSelector: '#agents-management-tour-create',
          title: 'Create a new Agent',
          description: [
            'Use Create Agent to add a new company profile to the system.',
            'Prepare key fields like Company Name, Agency Code, Currency, and contact info.',
          ],
          placement: 'left',
        },
        {
          id: 'agents-management-search',
          targetSelector: '#agents-management-tour-search',
          title: 'Search and filter',
          description: [
            'Search by company name, agency code, or contact email.',
            'Filtering helps you focus on a specific Agent or subset quickly.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agents-management-sort',
          targetSelector: '#agents-management-tour-sort',
          title: 'Toggle sort order',
          description: [
            'Switch between ascending and descending ordering for the list.',
            'Great for reviewing new or old records first depending on your task.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agents-management-table',
          targetSelector: '#agents-management-tour-table',
          title: 'Agent list table',
          description: [
            'The table includes Company Name, Agency Code, Currency, and Assigned By fields.',
            'Scan these columns to validate that a profile is complete before taking action.',
          ],
          placement: 'top',
        },
        {
          id: 'agents-management-actions',
          targetSelector: '#agents-management-tour-actions',
          title: 'View or edit actions',
          description: [
            'Use the Actions column to open the Agent detail page or edit the profile.',
            'This is the fastest way to update phone numbers, addresses, or contacts.',
          ],
          placement: 'top',
        },
        {
          id: 'agents-management-paginator',
          targetSelector: '#agents-management-tour-paginator',
          title: 'Pagination controls',
          description: [
            'Change the page size or navigate through large result sets here.',
            'It keeps the list manageable when there are many Agent records.',
          ],
          placement: 'top',
        },
        {
          id: 'agents-management-last-refreshed',
          targetSelector: '#agents-management-tour-last-refreshed',
          title: 'Last refreshed timestamp',
          description: [
            'Shows when the list was last updated from the backend.',
            'Confirm this when you need to ensure you are viewing current data.',
          ],
          placement: 'top',
        },
      ],
    },
  },
  agentDetail: {
    th: {
      steps: [
        {
          id: 'agent-detail-overview',
          targetSelector: '#agent-detail-tour-container',
          title: 'ภาพรวมข้อมูล Agent',
          description: [
            'หน้านี้แสดงรายละเอียดของ Agent รายเดียว ทั้งข้อมูลบริษัท การติดต่อ และบัญชีที่เกี่ยวข้อง.',
            'ใช้สำหรับตรวจสอบข้อมูลก่อนแก้ไข หรือดูบัญชี RES และ API Keys ที่ผูกอยู่กับ Agent นี้.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agent-detail-back',
          targetSelector: '#agent-detail-tour-back',
          title: 'กลับไปยังรายการ Agent',
          description: [
            'กดปุ่มลูกศรย้อนกลับเพื่อกลับไปที่หน้ารายชื่อ Agent.',
            'เหมาะเมื่อคุณตรวจสอบข้อมูลเสร็จแล้วและต้องการสลับไปดูรายอื่น.',
          ],
          placement: 'right',
        },
        {
          id: 'agent-detail-refresh',
          targetSelector: '#agent-detail-tour-refresh',
          title: 'รีเฟรชข้อมูล Agent',
          description: [
            'กด Refresh now เพื่อโหลดข้อมูล Agent ล่าสุดจากระบบ.',
            'แนะนำให้ใช้หลังมีการอัปเดตข้อมูลจากหน้าการแก้ไข.',
          ],
          placement: 'left',
        },
        {
          id: 'agent-detail-edit',
          targetSelector: '#agent-detail-tour-edit',
          title: 'เข้าสู่หน้าแก้ไข',
          description: [
            'ปุ่ม Edit Agent ใช้แก้ไขข้อมูลโปรไฟล์ เช่น บริษัท รหัส Agency หรือข้อมูลติดต่อ.',
            'หลังบันทึกข้อมูลใหม่ ระบบจะอัปเดตทันทีและสามารถกลับมาดูที่หน้านี้ได้.',
          ],
          placement: 'left',
        },
        {
          id: 'agent-detail-info',
          targetSelector: '#agent-detail-tour-info',
          title: 'ข้อมูล Agent หลัก',
          description: [
            'ส่วนนี้แสดง Company Name, Agency Code, Currency, ชื่อผู้ติดต่อ และผู้รับผิดชอบ.',
            'ตรวจสอบวันที่สร้างและแก้ไขล่าสุดเพื่อดูประวัติการปรับปรุงข้อมูล.',
          ],
          placement: 'top',
        },
        {
          id: 'agent-detail-address',
          targetSelector: '#agent-detail-tour-address',
          title: 'ที่อยู่และภูมิภาค',
          description: [
            'แสดงที่อยู่ทั้งหมด เช่น Address, City, State, Postal Code และ Country Code.',
            'ข้อมูลนี้ใช้ประกอบเอกสารหรือการตรวจสอบสถานที่ของตัวแทน.',
          ],
          placement: 'top',
        },
        {
          id: 'agent-detail-tabs',
          targetSelector: '#agent-detail-tour-tabs',
          title: 'แท็บข้อมูลที่เกี่ยวข้อง',
          description: [
            'สลับดู RES Accounts, Contact Emails และ API Keys ที่ผูกกับ Agent รายนี้.',
            'ใช้แท็บเหล่านี้เพื่อจัดการบัญชีหลัก เพิ่มอีเมลผู้ติดต่อ หรือสร้างคีย์ใหม่.',
          ],
          placement: 'top',
        },
        {
          id: 'agent-detail-last-refreshed',
          targetSelector: '#agent-detail-tour-last-refreshed',
          title: 'เวลาที่รีเฟรชล่าสุด',
          description: [
            'แสดงเวลาล่าสุดที่ข้อมูล Agent ถูกดึงมาแสดง.',
            'ช่วยตรวจสอบว่าข้อมูลล่าสุดถูกอัปเดตแล้วหรือไม่.',
          ],
          placement: 'top',
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
          id: 'agent-detail-overview',
          targetSelector: '#agent-detail-tour-container',
          title: 'Agent detail overview',
          description: [
            'This page shows the full profile for a single Agent, including company info and related resources.',
            'Use it to validate details before editing and to access RES accounts, emails, and API keys.',
          ],
          placement: 'bottom',
        },
        {
          id: 'agent-detail-back',
          targetSelector: '#agent-detail-tour-back',
          title: 'Return to the list',
          description: [
            'Use the back arrow to return to the Agents list.',
            'Helpful when you finish reviewing this profile and need another Agent.',
          ],
          placement: 'right',
        },
        {
          id: 'agent-detail-refresh',
          targetSelector: '#agent-detail-tour-refresh',
          title: 'Refresh agent data',
          description: [
            'Click Refresh now to fetch the latest Agent data from the backend.',
            'Recommended after making updates in the edit screen.',
          ],
          placement: 'left',
        },
        {
          id: 'agent-detail-edit',
          targetSelector: '#agent-detail-tour-edit',
          title: 'Edit the profile',
          description: [
            'Use Edit Agent to update company name, agency code, or contact details.',
            'Save changes there and return here to confirm the updates.',
          ],
          placement: 'left',
        },
        {
          id: 'agent-detail-info',
          targetSelector: '#agent-detail-tour-info',
          title: 'Core Agent information',
          description: [
            'Includes company name, agency code, currency, contact name, and ownership fields.',
            'Check created/modified timestamps to see the most recent updates.',
          ],
          placement: 'top',
        },
        {
          id: 'agent-detail-address',
          targetSelector: '#agent-detail-tour-address',
          title: 'Address details',
          description: [
            'Shows address lines, city, state/province, postal code, and country/region.',
            'Use these details for documentation and geographic verification.',
          ],
          placement: 'top',
        },
        {
          id: 'agent-detail-tabs',
          targetSelector: '#agent-detail-tour-tabs',
          title: 'Related resources tabs',
          description: [
            'Switch between RES Accounts, Contact Emails, and API Keys for this Agent.',
            'Use these tabs to manage access, contacts, and credentials in one place.',
          ],
          placement: 'top',
        },
        {
          id: 'agent-detail-last-refreshed',
          targetSelector: '#agent-detail-tour-last-refreshed',
          title: 'Last refreshed timestamp',
          description: [
            'Displays the last time the Agent profile was refreshed.',
            'Confirm this to ensure you are viewing the latest data.',
          ],
          placement: 'top',
        },
      ],
    },
  },
};
