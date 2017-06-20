const currencyName = 'Chip';

export default {
    system: "Hệ Thống",
    game_title: "B1368",
    lost_connection: "Kết nối tới máy chủ bị gián đoạn. Vui lòng đăng nhập lại!",
    can_not_connect_to_server: "Không thể kết nối tới máy chủ",
    lost_connection_without_reconnect: "Kết nối tới máy chủ bị gián đoạn!",
    waiting_server_response: 'Đang gửi yêu cầu tới server ....',
    change_language_fail: "Đổi ngôn ngữ thất bại",  
    invalid_play_card: "Bài không hợp lệ",
    coming_soon: "Chức năng đang phát triển!",
    error_system: 'Hệ thống không thể thực hiện yêu cầu. Vui lòng thử lại sau!',
    error_unknow: 'Lỗi Không xác định, vui lòng gọi tổng đài để được hỗ trợ.',
    error_not_support_game: "Game không được hỗ trợ",
    error_fail_to_create_game: "Không thể khởi tạo bàn chơi",
    error_fail_to_load_game_data: "Không thể tải dữ liệu bàn chơi",
    error_gift_code_is_invalid: "Mã thưởng không đúng định dạng",
    error_user_enter_empty_input: "Vui lòng nhập đầy đủ thông tin",
    error_card_code_is_invalid: "Mã thẻ không hợp lệ",
    error_dont_have_permission: "Bạn không đủ điều kiện sử dụng",
    error_serial_number_is_invalid: "Số seri không hợp lệ.",
    error_changed_password_is_invalid: "Mật khẩu mới phải từ 6 ký tự trong đó có ít nhất 1 số, 1 ký tự thường, không có ký tự đặc biệt và dấu cách.",
    error_password_confirmation_is_not_the_same: "Nhập lại mật khẩu mới không chính xác",
    error_user_not_enough_gold_to_join_room: `Bạn cần {{minBalance}} ${currencyName} để có thể tham gia bàn chơi.Bạn có muốn Nạp Chip để tiếp tục ?`,
    error_exchange_dialog_need_to_choice_item: "Chưa chọn loại phần thưởng",
    error_exchange_dialog_not_enough_money: `Số chip hiện tại {{ownerCoin}} ${currencyName} không đủ để đổi vật phẩm {{name}}`,
    error_phone_number_is_invalid: 'Số điện thoại không hợp lệ',
    error_while_sending_feedback: 'Gửi góp ý thất bại, xin vui lòng thử lại',
    error_feedback_too_long: 'Nội dung góp ý không được vượt quá 200 ký tự',
    error_function_does_not_support: 'Không thể thực hiện thao tác này !',
    error_password_changed_unsuccessfully: 'Đổi mật khẩu thất bại!',
    error_phonenumber_changed_unsuccessfully: 'Cập nhật số điện thoại thất bại!',
    error_long_is_ineligible: 'Bạn hiện tại không đủ điều kiện thực hiện chức năng này.',
    error_transfer_input_is_invalid: 'Số chip {{type}} không hợp lệ.',
    error_transfer_input_is_over_max: 'Số chip {{type}} không được vượt quá {{max}}.',
    error_transfer_input_is_not_over_allow: `Số chip mỗi lần {{type}} không được vượt quá {{limit}} ${currencyName}.`,
    error_transfer_input_is_too_small: `Số chip {{type}} tối thiểu là {{min}} ${currencyName}.`,
    error_transfer_input_is_not_enough: `Bạn cần tối thiểu {{amount}} ${currencyName} để thực hiện thao tác này.`,
    error_balance_is_not_enough: 'Số dư trong tài khoản không đủ, cần tối thiểu {{amount}} trong ngân hàng.',
    error_system_not_support_join_room_have_password: 'Hệ thống chưa hỗ trợ vào bàn chơi có mật khẩu',
    error_undefined_please_try_again: 'Lỗi chưa xác định, vui lòng thử lại!',
    error_undefined: 'Lỗi {{error}} chưa được xác định. Vui lòng gọi hỗ trợ!',
    error_cannot_init_facebook: 'Không thể khởi tạo chức năng đăng nhập Facebook. Vui lòng gọi hỗ trợ!',
    error_username_not_match: 'Tên đăng nhập từ 6 - 15 kí tự bao gồm chữ và số',
    error_please_input_withdraw_amount: 'Vui lòng nhập số chip cần rút',
    error_withdraw_amount_cannot_small_than: `Số chip cần rút không được nhỏ hơn {{amount}} ${currencyName}`,
    error_withdraw_amount_must_greater_than_zero: 'Số chip cần rút phải lớn hơn 0',
    error_withdraw_amount_unable_to_greater_than: `Số chip cần rút không được lớn hơn {{amount}} ${currencyName}`,
    error_account_out_of_money: 'Tài khoản của bạn đã hết chip',
    error_vip_only: 'Bạn cần phải là vip để sử dụng chức năng này',
    error_not_support_platform: 'Chức năng này không hỗ trợ trên phiên bản Web',
    error_cannot_kick_player_vip: 'Bạn không thể kick người chơi có mức VIP cao hơn',
    
    greeting_newbiew: `Chào mừng bạn đến với game bài 1368`,
    daily_gift: `Quà đăng nhập hàng ngày`,
    get_transfer_success: `Bạn đã rút thành công {{amount}} ${currencyName}. Chúc bạn chơi game vui vẻ.`,
    transfer_successfully: `Chuyển thành công {{amount}} ${currencyName} tới {{username}}.`,
    exchange_dialog_confirmation: `Bạn có muốn đổi {{gold}} ${currencyName} để nhận {{name}} ?`,
    really_wanna_quit: 'Bạn có chắc chắn muốn thoát ?',
    phone_number_confirmation: 'Xác nhận số điện thoại thành công.',
    user_got_invitation_to_join_room: `{{invoker}}  muốn mời bạn vào phòng chơi {{minBet}} ${currencyName}.`,
    user_transaction_money: `{{sender}} đã chuyển {{amount}} ${currencyName} cho bạn`,
    feedback_sent_successfully: 'Góp ý của bạn đã được gửi tới ban quản trị',
    confirm_kick_user: 'Bạn có muốn kick người chơi này ra khỏi phòng !',
    password_changed_successfully: 'Đổi mật khẩu thành công',
    phonenumber_changed_successfully: 'Cập nhật số điện thoại thành công',
    is_ineligible: 'Không đủ điều kiện',
    jar_explosion: 'Chúc mừng bạn đã đập trúng hũ',
    is_not_enough_money_to_bet: 'Bạn không đủ chip để thực hiện thao tác này',
    is_waiting_card: 'Đang chờ duyệt thẻ',
    trading_is_cancelled: 'Giao dịch bị huỷ bỏ',
    got_money: 'Đã nhận lại chip',
    request_is_cancelled: 'Đã huỷ yêu cầu',
    sent: 'Đã gửi thưởng',
    game_heo: 'heo',
    game_heo_den: 'heo đen',
    game_heo_do: 'heo đỏ',
    game_ba_doi_thong: '3 đôi thông',
    game_bon_doi_thong: '4 đôi thông',
    game_tu_quy: 'tứ quý',
    game_ba_bich: '3 bích',
    game_thoi: 'Thối',
    game_waiting_time: 'Thời gian chờ',
    game_waiting: 'Chờ',
    game_waiting_for_game_start: 'Chờ ván mới bắt đầu',
    game_start: 'Bắt đầu',
    game_replay_waiting_time: 'Ván mới',
    label_accept: 'Đồng ý',
    label_deny: 'Hủy',
    label_close: 'Đóng',
    label_withdrawal: 'Rút chip',
    label_enter_game: 'Vào game',
    random_invite_player_successfully: 'Lời mời vào bàn chơi đã được gửi đi',
    error_cannot_load_data: 'Không thể tải dữ liệu',
    loading_data: 'Đang tải dữ liệu...',
    re_sending_item_iap: 'Đang thực hiện lại giao dịch ...',
    sending_item_store_iap: 'Đang thực hiện giao dịch tới {{provider}}...',
    iap_buying_successfully_wait_server_response: 'Vật phẩm đã đc mua, đợi xác nhận từ server .....',
    label_input_withdrawal_amount: 'Nhập số chip cần rút',
    label_topup_money: 'Nạp chip',

    game_error_phom_select_one_card_to_play: "Hãy chọn một quân bài để đánh",
    game_error_phom_cannot_play_card_in_eaten_phom: "Không thể đánh bài trong phỏm đã ăn",
    game_table_name: 'Bàn {{tableName}} - {{gameName}}',
    game_sam_thang_sam: 'Thắng Sâm',
    game_sam_den_sam: 'Đền Sâm',
    game_sam_den_thoi_heo: 'Đền Thối Heo',
    game_sam_treo: 'Treo',
    game_thua: 'Thua',
    game_thang: 'Thắng',
    game_result_card_count: '{{count}} lá',
    game_bet_time: 'Đặt cược',
    game_down_card_time: 'Hạ bài',
    game_bacay_sap: 'Sáp',
    game_result_bacay_point: '{{point}} nước',
    game_result_bacay_10_point: 'Mười nước',
    game_result_bacay_tit: 'Tịt...',
    game_result_bacay_nai: 'Nái...',
    game_result_bacay_nua_doi: 'Nửa đời',
    game_bacay_cuoc_bien: 'Cược biên',
    game_bacay_cuop_chuong: 'Cướp chương',
    game_bacay_ask_to_accept_cuoc_bien: '{{player}} muốn CƯỢC BIÊN với bạn {{value}} Chip',
    game_bacay_chi_cuoc_bien_mot_lan: 'Chỉ được cược biên với người chơi một lần',
    game_bacay_khong_the_cuoc_bien: 'Bạn không thể cược biên với người chơi này',
    game_bacay_not_enough_balance_to_cuoc_bien: 'Bạn không đủ tiền để cược biên',
    game_bacay_cannot_bet_more_than_current: 'Bạn không thể cược lớn hơn giá trị hiện tại',
    game_bacay_min_balance_to_gop_ga: 'Bạn phải có trên {{amount}} để có thể góp gà',
    game_registered_quit_room: 'Đăng ký rời bàn thành công',
    game_start_deal_card: 'Bắt đầu chia bài',
    game_change_master_to_player: 'Chuyển chương cho người chơi {{playerName}}',
    game_bet: 'Cược',
    game_down_card: 'Hạ bài',
    game_not_enough_balance_to_cuoc_bien: 'Tài khoản không đủ để Cược Biên',
    game_not_enough_balance_to_bet: 'Tài khoản không đủ để tiếp tục Cược',
    game_phom_u: 'Ù',
    game_phom_u_den: 'ù đền',
    game_phom_u_khan: 'ù khan',
    game_phom_u_phom_kin: 'u phỏm kín',
    game_phom_u_tron: 'ù tròn',
    game_phom_mom: 'móm',
    game_phom_invalid_down_phom: 'Chọn phỏm hạ không đúng',
    game_phom_must_contain_all_eaten_card: 'Phỏm hạ phải chứa tất cả bài đã ăn',
    game_phom_cannot_eat: 'Không thể ăn, vui lòng chọn lại!',
    game_phom_not_found_eat_card: 'Không tìm thấy phỏm có thể ăn!',
    game_bo_luot: 'Bỏ lượt',
    game_nhat: 'nhất',
    game_nhi: 'nhì',
    game_ba: 'ba',
    // game_bet: 'bét',
    game_point: '{{point}} điểm',
    game_tlmn_card_count: '{{count}} lá',
    game_tlmn_an_trang: 'Ăn trắng',
    game_tlmn_dut_ba_bich: 'Đút 3 bích',
    game_tlmn_lung: 'Lũng',
    game_tlmn_thoi_ba_bich: 'Thối 3 bích',
    game_tlmn_cong: 'Cóng',
    game_tlmn_sanh_rong_dong_hoa: 'Sảnh rồng đồng hoa',
    game_tlmn_sanh_rong: 'Sảnh rồng',
    game_tlmn_dong_hoa: 'Đồng hoa',
    game_tlmn_sau_doi_thong: 'Sáu đôi thông',
    game_tlmn_nam_doi_thong: 'Năm đôi thông',
    game_tlmn_sau_doi: 'Sáu đôi',
    game_tlmn_sam_co: '4 sám cô',
    game_tlmn_tu_quy_hai: 'Tứ quý 2',
    game_dong_chat: 'Đồng chất',
    game_nam_doi: 'Năm đôi',
    game_sam_bao_sam: 'Báo Sâm',
    game_ba_sam_co: '3 sám cô',
    game_sam_cannot_play_2_at_the_end: 'Không thể đánh 2 cuối cùng',
    game_cannot_skip_down_if_eaten: 'Không thể bỏ hạ khi bạn đã ăn!',
    buddy_not_in_your_buddy_list: 'Tài khoản {{buddyName}} không thuộc danh sách bạn bè của bạn',
    buddy_not_found_receiver_buddy: 'Không tìm thấy người chơi cần gửi tin nhắn đến',
    buddy_undefined_error: '{{errorCode}} Lỗi liên quan đến chức năng bạn bè chưa xác định. Vui lòng gọi hỗ trợ!',
    buddy_cannot_block_offline_buddy: 'Không thể khóa (mở khóa) người chơi đang offline',
    buddy_buddy_list_is_full: 'Danh sách bạn bè vượt quá giới hạn không thể thêm bạn',
    error_code: 'Mã lỗi ({{errorCode}}). ',
    game_name_tlmn: "TLMN",
    game_name_tlmn_solo: "TLMN Solo",
    game_name_sam: "Sâm",
    game_name_sam_solo: "Sâm Solo",
    game_name_ba_cay: "Ba cây",
    game_name_lieng: "Liêng",
    game_name_phom: "Phỏm",
    game_name_xi_to: "Xì tố",
    game_name_xoc_dia: "Xóc đĩa",
    game_playing_game: "Đang chơi:",
    confirm_remove_buddy: "Bạn có chắc chắn muốn hủy bết bạn với {{buddyName}}",
    confirm_block_buddy: "Bạn có chắc chắn muốn block {{buddyName}}",
    confirm_add_to_buddy_list: "{{sender}} muốn kết bạn với bạn. Bạn có đồng ý kết bạn?",
    buddy_chat_with_online_buddy_only: "Chỉ có thể chat với bạn đang online!",
    input_content: "Nhập nội dung",
    buddy_removed_buddy: "Đã hủy kết bạn với {{buddyName}}!",
    buddy_added_buddy: "{{buddyName}} đã được thêm vào danh sách bạn bè!",
    buddy_already_in_buddy_list: "{{buddyName}} đã tồn tại trong danh sách bạn bè!",

    buddy_request_already_send: "Đã gửi yêu cầu kết bạn tới {{buddyName}} ",

    buddy_select_buddy_to_chat: "Chọn bạn để chat!",

    hotline: "Hỗ trợ: {{hotline}}",
    logging_in_via_facebook: "Đang đăng nhập bằng facebook",
    play_now_not_support_on_mobile: "Chức năng chơi ngay không được hỗ trợ trên bản Web. Vui lòng dùng chức năng này trên Điện thoại",
    play_now_not_available_right_now: "Chức năng chơi ngay không thực hiện được vào lúc này. Vui lòng thử lại sau!",
    username_rule: "Tên đăng nhập (6 - 15 kí tự)",
    input_username_title: "Nhập tên đăng nhập",
    message_not_enough_money: 'Bạn cần {{money}} ' + currencyName + ' để đủ điều kiện chơi trong bàn cược {{minBet}}',

    message_block_invite_game_action: "Bạn chỉ được mời chơi {{time}} một lần",
    message_block_exchange_card_action: "Bạn chỉ được đổi thưởng {{time}} một lần",
    message_block_transfer_action: "Mỗi lần chuyển tiền cách nhau {{time}}",
    message_force_update_version: "Bạn phải cập nhật lên phiên bản {{version}} để tiếp tục chơi",
    message_update_version: "Phiên bản mới nhất là {{version}}. Bạn có muốn cập nhật?",
};
