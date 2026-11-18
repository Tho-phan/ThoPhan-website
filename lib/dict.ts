// All copy, in both languages. Only two names appear publicly: GoHub Inc. and Saola Labs (PRODUCT.md).
// Case studies are deliberately generic: no client names, URLs or data.
import type { Locale } from "./i18n";

export const profile = {
  name: "Tho Phan",
  linkedin: "https://www.linkedin.com/in/tho-phan-70258132a/",
  email: "phannguyenvantho@gmail.com",
};

const en = {
  meta: {
    title: "Tho Phan, full-stack engineer",
    description:
      "Full-stack engineer building multi-tenant commerce across Vietnam and the US. Flutter, React, TypeScript, Hono, PostgreSQL.",
  },
  nav: { linkedin: "LinkedIn", contact: "Contact", language: "Language", contactLabel: "Contact" },
  hero: {
    role: "Full-stack engineer",
    headline: "I build the commerce platform behind eSIMs sold in Vietnam and the US.",
    intro:
      "Flutter app, React portal, two TypeScript backends, one shared codebase. I ship features end to end, from the schema to the screen.",
    altVn: "Boats with glowing lanterns on the river at night in Hoi An",
    altUs: "Downtown Pittsburgh and its yellow bridges at golden hour, seen from Mount Washington",
  },
  tenant: { group: "Choose a city theme", vn: "Ho Chi Minh City", us: "Pittsburgh" },
  route: { aria: "Data travelling between Ho Chi Minh City and Pittsburgh", from: "Ho Chi Minh City", to: "Pittsburgh" },
  chapters: {
    title: "Two cities, one workday",
    lead: "I work from Ho Chi Minh City and study in Pittsburgh. Scroll, and the site follows.",
    items: [
      { city: "vn", src: "/photos/vn-bluehour.jpg", alt: "Ho Chi Minh City towers over the Saigon River at dusk", title: "Ho Chi Minh City, evening", text: "This is where I work. The team, the customers and most of the platform's traffic are here, and the day ends when the river turns blue." },
      { city: "us", src: "/photos/us-fall-park.jpg", alt: "A yellow arch bridge and autumn trees along the Pittsburgh riverbank", title: "Pittsburgh, autumn", text: "This is where I study. Duquesne sits on the bluff above the rivers, and the hills turn orange every October." },
      { city: "vn", src: "/photos/vn-saigon.jpg", alt: "Saigon high-rises lit at night and reflected in the river", title: "Saigon, after dark", text: "Saigon runs eleven or twelve hours ahead of Pittsburgh. The platform has to keep both clocks: two markets, two currencies, one codebase." },
      { city: "us", src: "/photos/us-fall-trail.jpg", alt: "A leaf-covered riverside path in Pittsburgh under yellow trees", title: "Pittsburgh, riverside", text: "Classes, tutoring and most of my side projects happen here, a short walk from the water." },
    ],
  },
  jobs: {
    title: "Where I have worked",
    items: [
      { when: "Aug 2025 – now", where: "GoHub Inc., Ho Chi Minh City", what: "Full-stack developer on a multi-tenant eSIM commerce platform for Vietnam and the US. Typed REST APIs, event-driven catalog sync, a tenant-aware pricing engine, and Stripe and bank-transfer payments." },
      { when: "May 2025 – Aug 2025", where: "GoHub Inc., Ho Chi Minh City", what: "Built a reporting module that calculates cost of goods sold across 500,000+ inventory items, plus authentication, product management and internal tools." },
      { when: "May 2025 – Apr 2026", where: "Saola Labs, remote", what: "Frontend intern on a water-management platform covering 20,000 km² of regional Australia. React features and live ArcGIS maps, built with backend engineers." },
    ],
  },
  cases: {
    title: "Problems I solved",
    lead: "The code is private, so these are told without names or numbers beyond what is already public.",
    labels: { problem: "The problem", did: "What I did", changed: "What changed" },
    items: [
      { title: "Keeping a product catalog in sync", problem: "Supplier catalogs change all day. A missed update means a wrong price or a dead product on sale.", decision: "Syncs run as queued jobs (BullMQ and Redis). Incoming webhooks can be replayed, and every job reports its lifecycle so a failed sync is visible.", result: "Syncs are reliable and observable, and a bad run can be replayed instead of fixed by hand." },
      { title: "One codebase, two markets", problem: "Each tenant needs its own prices, tax rules and look, and a fork per market would not stay maintainable.", decision: "Tenant price lists, VAT rules and theming are data, resolved at runtime. The web portal ships per-region builds from the same repo.", result: "A new tenant is configuration, not a new project." },
      { title: "Reports over half a million items", problem: "Cost of goods sold had to be calculated across 500,000+ inventory items without timing out.", decision: "Aggregation moved into the database, and I added targeted indexes and parallelized independent queries.", result: "A heavy report became a request people can wait on." },
    ],
  },
  queue: {
    title: "Under the hood",
    lead: "Most of my work happens below the surface: queues, retries and replays that keep a sync honest. This is a small picture of that job lifecycle.",
    aria: "Example job queue",
    job: "sync-catalog batch",
    status: { queued: "Waiting", active: "Running", failed: "Failed", replayed: "Replaying", done: "Done" },
  },
  beyond: {
    title: "Beyond code",
    tutoring:
      "Since December 2024 I tutor middle school math online, one-on-one and in small groups. Explaining a hard idea to a 12-year-old is the best practice I know for writing clear code and clear docs.",
    school: "Computer Science at Duquesne University, class of 2028.",
    or: "or",
  },
  contact: {
    title: "Say hello",
    lead: "I am open to software engineering, full-stack and backend roles.",
    name: "Your name",
    email: "Your email",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    ok: "Message sent. I'll reply soon.",
    errors: {
      invalid: "Please fill in your name, a valid email and a message of at least 10 characters.",
      not_setup: "The contact form is not set up yet. Please email directly.",
      send: "Could not send your message. Please try again later.",
      generic: "Could not send your message.",
    },
  },
  credits: { prefix: "Photos from Wikimedia Commons:", suffix: "and CC0 views of Hoi An and Saigon." },
};

export type Dict = typeof en;

const vi: Dict = {
  meta: {
    title: "Tho Phan, kỹ sư full-stack",
    description:
      "Kỹ sư full-stack xây dựng nền tảng thương mại đa đối tác cho Việt Nam và Hoa Kỳ. Flutter, React, TypeScript, Hono, PostgreSQL.",
  },
  nav: { linkedin: "LinkedIn", contact: "Liên hệ", language: "Ngôn ngữ", contactLabel: "Liên hệ" },
  hero: {
    role: "Kỹ sư full-stack",
    headline: "Tôi xây dựng nền tảng thương mại cho eSIM bán tại Việt Nam và Hoa Kỳ.",
    intro:
      "Ứng dụng Flutter, cổng quản trị React, hai hệ thống backend TypeScript, dùng chung một mã nguồn. Tôi làm trọn vẹn từ cơ sở dữ liệu đến màn hình.",
    altVn: "Những chiếc thuyền thắp đèn lồng trên sông vào ban đêm ở Hội An",
    altUs: "Trung tâm Pittsburgh và những cây cầu vàng lúc hoàng hôn, nhìn từ núi Mount Washington",
  },
  tenant: { group: "Chọn giao diện theo thành phố", vn: "TP. Hồ Chí Minh", us: "Pittsburgh" },
  route: { aria: "Dữ liệu di chuyển giữa TP. Hồ Chí Minh và Pittsburgh", from: "TP. Hồ Chí Minh", to: "Pittsburgh" },
  chapters: {
    title: "Hai thành phố, một ngày làm việc",
    lead: "Tôi làm việc tại TP. Hồ Chí Minh và học tại Pittsburgh. Cuộn xuống, trang web sẽ đi theo.",
    items: [
      { city: "vn", src: "/photos/vn-bluehour.jpg", alt: "Những tòa nhà cao tầng của TP. Hồ Chí Minh bên sông Sài Gòn lúc chạng vạng", title: "TP. Hồ Chí Minh, buổi tối", text: "Đây là nơi tôi làm việc. Đội ngũ, khách hàng và phần lớn lưu lượng của nền tảng đều ở đây, và ngày kết thúc khi dòng sông chuyển sang màu xanh." },
      { city: "us", src: "/photos/us-fall-park.jpg", alt: "Cây cầu vòm màu vàng và hàng cây mùa thu bên bờ sông Pittsburgh", title: "Pittsburgh, mùa thu", text: "Đây là nơi tôi học. Đại học Duquesne nằm trên vách đồi phía trên những dòng sông, và mỗi tháng Mười những ngọn đồi lại ngả sang màu cam." },
      { city: "vn", src: "/photos/vn-saigon.jpg", alt: "Những tòa nhà cao tầng Sài Gòn sáng đèn ban đêm, phản chiếu xuống mặt sông", title: "Sài Gòn về đêm", text: "Sài Gòn đi trước Pittsburgh khoảng mười một đến mười hai tiếng. Nền tảng phải chạy đúng theo cả hai múi giờ: hai thị trường, hai loại tiền tệ, một mã nguồn." },
      { city: "us", src: "/photos/us-fall-trail.jpg", alt: "Con đường ven sông phủ đầy lá dưới những hàng cây vàng ở Pittsburgh", title: "Pittsburgh, bên bờ sông", text: "Lớp học, việc dạy kèm và phần lớn dự án riêng của tôi diễn ra ở đây, chỉ cách mặt nước một quãng đi bộ ngắn." },
    ],
  },
  jobs: {
    title: "Nơi tôi đã làm việc",
    items: [
      { when: "08/2025 – nay", where: "GoHub Inc., TP. Hồ Chí Minh", what: "Lập trình viên full-stack trên nền tảng thương mại eSIM đa đối tác cho thị trường Việt Nam và Hoa Kỳ. API REST định kiểu chặt chẽ, đồng bộ danh mục sản phẩm theo sự kiện, bộ tính giá riêng cho từng đối tác, thanh toán qua Stripe và chuyển khoản ngân hàng." },
      { when: "05/2025 – 08/2025", where: "GoHub Inc., TP. Hồ Chí Minh", what: "Xây dựng module báo cáo tính giá vốn hàng bán trên hơn 500.000 mặt hàng tồn kho, cùng chức năng đăng nhập, quản lý sản phẩm và các công cụ nội bộ." },
      { when: "05/2025 – 04/2026", where: "Saola Labs, làm việc từ xa", what: "Thực tập sinh frontend trên một nền tảng quản lý nguồn nước phủ 20.000 km² vùng nông thôn nước Úc. Xây dựng các tính năng React và bản đồ ArcGIS thời gian thực, phối hợp cùng các kỹ sư backend." },
    ],
  },
  cases: {
    title: "Những vấn đề tôi đã giải quyết",
    lead: "Mã nguồn là riêng tư, nên những câu chuyện này được kể mà không nêu tên hay số liệu ngoài những gì đã công khai.",
    labels: { problem: "Vấn đề", did: "Tôi đã làm gì", changed: "Kết quả" },
    items: [
      { title: "Giữ danh mục sản phẩm luôn đồng bộ", problem: "Danh mục của nhà cung cấp thay đổi suốt cả ngày. Bỏ sót một lần cập nhật nghĩa là giá sai, hoặc một sản phẩm đã ngừng vẫn đang được bán.", decision: "Mỗi lần đồng bộ chạy như một công việc trong hàng đợi (BullMQ và Redis). Các webhook nhận vào có thể chạy lại, và mỗi công việc đều báo cáo vòng đời của nó nên một lần đồng bộ bị lỗi luôn nhìn thấy được.", result: "Việc đồng bộ ổn định và theo dõi được, và một lần chạy lỗi có thể chạy lại thay vì sửa bằng tay." },
      { title: "Một mã nguồn, hai thị trường", problem: "Mỗi đối tác cần bảng giá, quy tắc thuế và giao diện riêng, và tách một bản sao cho mỗi thị trường thì không thể bảo trì lâu dài.", decision: "Bảng giá, quy tắc VAT và giao diện của từng đối tác là dữ liệu, được áp dụng khi chạy. Cổng web phát hành bản dựng riêng cho từng khu vực từ cùng một kho mã nguồn.", result: "Thêm một đối tác mới chỉ là cấu hình, không phải một dự án mới." },
      { title: "Báo cáo trên nửa triệu mặt hàng", problem: "Giá vốn hàng bán phải được tính trên hơn 500.000 mặt hàng tồn kho mà không bị quá thời gian chờ.", decision: "Tôi chuyển phần tổng hợp vào cơ sở dữ liệu, thêm các chỉ mục có chủ đích và chạy song song những truy vấn độc lập.", result: "Một báo cáo nặng trở thành một yêu cầu mà người dùng có thể chờ được." },
    ],
  },
  queue: {
    title: "Bên dưới bề mặt",
    lead: "Phần lớn công việc của tôi diễn ra bên dưới bề mặt: hàng đợi, thử lại và chạy lại để việc đồng bộ luôn chính xác. Đây là một hình minh họa nhỏ về vòng đời của một công việc.",
    aria: "Ví dụ về hàng đợi công việc",
    job: "đồng bộ danh mục, lô",
    status: { queued: "Đang chờ", active: "Đang chạy", failed: "Lỗi", replayed: "Chạy lại", done: "Xong" },
  },
  beyond: {
    title: "Ngoài lập trình",
    tutoring:
      "Từ tháng 12/2024, tôi dạy kèm môn Toán trực tuyến cho học sinh cấp hai, theo từng em và theo nhóm nhỏ. Giải thích một ý khó cho một em 12 tuổi là cách luyện tập tốt nhất tôi biết để viết code và tài liệu cho rõ ràng.",
    school: "Ngành Khoa học Máy tính tại Đại học Duquesne, dự kiến tốt nghiệp năm 2028.",
    or: "hoặc",
  },
  contact: {
    title: "Gửi lời chào",
    lead: "Tôi đang tìm cơ hội ở các vị trí kỹ sư phần mềm, full-stack và backend.",
    name: "Tên của bạn",
    email: "Email của bạn",
    message: "Lời nhắn",
    send: "Gửi tin nhắn",
    sending: "Đang gửi…",
    ok: "Đã gửi tin nhắn. Tôi sẽ sớm trả lời.",
    errors: {
      invalid: "Vui lòng điền tên, một email hợp lệ và lời nhắn dài ít nhất 10 ký tự.",
      not_setup: "Biểu mẫu liên hệ chưa được thiết lập. Vui lòng gửi email trực tiếp.",
      send: "Không gửi được tin nhắn. Vui lòng thử lại sau.",
      generic: "Không gửi được tin nhắn.",
    },
  },
  credits: { prefix: "Ảnh từ Wikimedia Commons:", suffix: "và ảnh CC0 của Hội An và Sài Gòn." },
};

export const dictionaries: Record<Locale, Dict> = { en, vi };
