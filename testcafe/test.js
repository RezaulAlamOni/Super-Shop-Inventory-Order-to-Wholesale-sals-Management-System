import { Selector, Role, ClientFunction } from "testcafe";
const getLocation = ClientFunction(() => window.location.href);
// const web_speed = 1;
var email = "user@jacos.co.jp";
var password = "Qe75ymSr";
//customer list'4901085183618', '4901085179611','4901085197530', '4909411063641', '4902102107648','4902102130950','4901777285491','4902750670341',, '4901005109797', '4902102129480', '4901085198056',
var jan_list = [
    "4901085189146",
    "4901085601020",
    "4909411070557",
    "4909411077273",
    "4902102128063",
    "4902102069359",
    "4901777314641",
    "4901777267503",
    "4901005510029",
    "4901005500341",
    "4901005109803",
    "4902750666832"
];
var customer_list_array = [
    "super1sd",
    "super2ds",
    "super3er",
    "super4ty",
    "super5kj",
    "super6rt",
    "super7eer",
    "super8ws",
    "super8jh",
    "super10kl",
    "super11ml",
    "super12sl"
];
var shop_list_array = [
    "shop 1",
    "shop 2",
    "shop 3",
    "shop 4",
    "shop 5",
    "shop 6",
    "shop 7",
    "shop 8",
    "shop 9",
    "shop 10",
    "shop 11",
    "shop 12"
];
//vendor list
var vendor_list_array = [
    "maker1hg",
    "maker2kl",
    "maker3jk",
    "maker4ty",
    "maker5re",
    "maker6gd",
    "maker7fg",
    "maker8fd",
    "maker8r",
    "maker10df",
    "maker11t",
    "maker12s"
];
var random_customer_vendor_code = Math.floor(Math.random() * 100000 + 1);
random_customer_vendor_code = random_customer_vendor_code.toString();
var jan = "4901085189146"; //jan_list[Math.floor(Math.random() * jan_list.length)];
var vendor_3 =
    vendor_list_array[Math.floor(Math.random() * vendor_list_array.length)];
var customer_3 = "super8ws";
//customer_list_array[Math.floor(Math.random() * customer_list_array.length)];

var random_customer_name =
    customer_list_array[Math.floor(Math.random() * customer_list_array.length)];
var random_vendor_name =
    vendor_list_array[Math.floor(Math.random() * vendor_list_array.length)];
var phone = "01936755674";
var login_url = "https://ryutu-van.dev.jacos.jp/rv3/login";
var site_url = "https://ryutu-van.dev.jacos.jp/rv3";
var vendor_master = "https://ryutu-van.dev.jacos.jp/rv3/vendor_master";
var customer_master = "https://ryutu-van.dev.jacos.jp/rv3/customer_master";
var receiveorder = "https://ryutu-van.dev.jacos.jp/rv3/receiveorder";
var shipment = "https://ryutu-van.dev.jacos.jp/rv3/shipment";
var manualOrder = "https://ryutu-van.dev.jacos.jp/rv3/manualOrder";
var login_url = "http://localhost/rv3/login";
var site_url = "http://localhost/rv3";
var vendor_master = "http://localhost/rv3/vendor_master";
var customer_master = "http://localhost/rv3/customer_master";
var receiveorder = "http://localhost/rv3/receiveorder";
var manualOrder = "http://localhost/rv3/manualOrder";
var shipment = "http://localhost/rv3/shipment";
const vendor_list_show_popup = Selector(".vendor_list_show_popup");
const filter_by_vendor_id = Selector("td.filter_by_vendor_id");
const maker_modal_heading = Selector("#maker_modal_heading");
const starting_page = Role(
    login_url,
    async t => {
        await t
            .typeText("#email", email)
            .typeText("#password", password)
            .click('input[type="submit"]');
    }, {
        preserveUrl: true
    }
);

fixture `Main page`
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });
test("login check", async t => {
    await t
        .maximizeWindow()
        .expect(getLocation())
        .contains("home");
});
/*
fixture `vendor_master page`.only
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });
test("vendor_master view", async t => {
    await t
        .click(Selector(".common_goto").withAttribute("data_num_link", "1"))
        .expect(getLocation())
        .contains("vendor_master");
});

test("vendor_master create", async t => {
    await t
        .navigateTo(vendor_master)
        .click(vendor_list_show_popup)
        .expect(maker_modal_heading.innerText)
        .eql("仕入先一覧")
        .click(Selector(".add_new_vendor"))
        .expect(Selector(".add_vendor_regs").innerText)
        .eql("追加")
        .typeText("#vendor_name", vendor_3)
        .typeText(
            "#vendor_code",
            Math.floor(Math.random() * 100000 + 1).toString()
        )
        .typeText("#vendor_phone", phone)
        .click(".add_vendor_regs")
        .expect(Selector(".add_new_vendor").innerText)
        .eql("追加")
        .click(Selector(".btn-warning").withExactText("戻る"))
        .wait(500);
});
test("vendor_master item add", async t => {
    await t
        .navigateTo(vendor_master)
        .click(Selector(".jancode"))
        .typeText(".jancode", jan)
        .pressKey("enter")
        .expect(Selector(".popup_center_message").innerText)
        .contains(
            "この商品は、メーカー（仕入先）が判別できません。「仕入先」を指示してください。"
        );
    if (await Selector(".vendor_list_show_popup").withText("仕入先別").exists) {
        await t
            .hover(Selector(".vendor_list_show_popup").withText("仕入先別"))
            .click(Selector(".vendor_list_show_popup").withText("仕入先別"));
    }
    await t
        .expect(maker_modal_heading.innerText)
        .contains("仕入先一覧")
        .click(filter_by_vendor_id.withText(vendor_3))
        .expect(Selector(".supplier_name_input").value)
        .eql(vendor_3)
        .wait(500);
});
test("vendor_master item update", async t => {
    await t
        .navigateTo(vendor_master)
        .click(vendor_list_show_popup)
        .expect(maker_modal_heading.innerText)
        .eql("仕入先一覧")
        .click(filter_by_vendor_id.withText(vendor_3))
        .expect(Selector(".supplier_name_input").value)
        .eql(vendor_3);
    if (
        await Selector("td")
        .withText(jan)
        .parent("tr")
        .find(".v_case_inputs").exists
    ) {
        var case_inputs = Selector("td")
            .withText(jan)
            .parent("tr")
            .find(".v_case_inputs");
        var ball_inputs = Selector("td")
            .withText(jan)
            .parent("tr")
            .find(".v_ball_inputs");
        var v_cost_price = Selector("td")
            .withText(jan)
            .parent("tr")
            .find(".v_cost_price");
        var v_in_company_code = Selector("td")
            .withText(jan)
            .parent("tr")
            .find(".v_in_company_code");
        await t
            .selectText(case_inputs)
            .pressKey("delete")
            .typeText(case_inputs, "24")
            .selectText(ball_inputs)
            .pressKey("delete")
            .typeText(ball_inputs, "6")
            .selectText(v_cost_price)
            .pressKey("delete")
            .typeText(v_cost_price, "100")
            .selectText(v_in_company_code)
            .pressKey("delete")
            .typeText(
                v_in_company_code,
                Math.floor(Math.random() * 100000 + 1).toString()
            )
            .wait(1000);
    }
});
fixture `customer_master page`.only
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });
test("customer_master view", async t => {
    await t
        .navigateTo(vendor_master)
        .click(Selector(".page_manage"))
        .expect(getLocation())
        .contains("customer_master");
});

test("customer_master create customer", async t => {
    await t
        .navigateTo(customer_master)
        .click(Selector(".customer_list_show_popup"))
        .expect(Selector(".add_new_customer").innerText)
        .eql("追加")
        .click(Selector(".add_new_customer").withText("追加"))
        .expect(Selector(".add_customer_info").innerText)
        .eql("追加")
        .typeText("#customer_name", customer_3)
        .typeText(
            "#customer_code",
            Math.floor(Math.random() * 100000 + 1).toString()
        )
        .typeText("#customer_phone", phone)
        .click(".add_customer_info")
        .expect(Selector(".add_new_customer").innerText)
        .eql("追加");
});
test("customer_master create shop", async t => {
    var shop_name =
        shop_list_array[Math.floor(Math.random() * shop_list_array.length)];
    const customerSelect = Selector("#customer_list");
    const customerOption = customerSelect.find("option");
    await t
        .navigateTo(customer_master)
        .click(Selector(".customer_list_show_popup"))
        .expect(Selector(".add_new_customer").innerText)
        .eql("追加")
        .click(Selector(".customer_shop").withText("店舗一覧"))
        .expect(Selector(".add_new_shop").innerText)
        .eql("追加")
        .click(Selector(".add_new_shop").withText("追加"))
        .click(customerSelect)
        .click(customerOption.withText(customer_3))
        .wait(500)
        .typeText(
            "#shop_code",
            Math.floor(Math.random() * 100000 + 1).toString()
        )
        .typeText("#shop_name", shop_name)
        .typeText("#shop_address", "Tokyo")
        .typeText("#postal_code", "1231")
        .typeText("#phone", "01936755674")
        .typeText("#email", "user@jacos.co.jp")
        .typeText("#delivery_cycle", "1")
        .click(Selector(".add_shop_info"))
        .expect(Selector(".add_new_shop").innerText)
        .eql("追加")
        .click(Selector(".custom_shop_close").withText("閉じる"))
        .expect(Selector(".add_new_customer").innerText)
        .eql("追加");
});
test("customer_master create customer item", async t => {
    await t
        .navigateTo(customer_master)
        .click(Selector(".customer_list_show_popup"))
        .expect(Selector(".add_new_customer").innerText)
        .eql("追加")
        .click(Selector(".filter_by_customer_id").withText(customer_3))
        .click(Selector(".jancode"))
        .typeText(".jancode", jan)
        .pressKey("enter")
        .expect(Selector("td").innerText)
        .eql(jan);
});
test("customer_master create customer item update", async t => {
    await t
        .navigateTo(customer_master)
        .click(Selector(".customer_list_show_popup"))
        .click(Selector(".filter_by_customer_id").withText(customer_3));
    if (
        await Selector("td")
        .withText(jan)
        .parent("tr")
        .find(".c_selling_price").exists
    ) {
        var selling_price = Selector("td")
            .withText(jan)
            .parent("tr")
            .find(".c_selling_price");
        await t
            .selectText(selling_price)
            .pressKey("delete")
            .typeText(selling_price, "120")
            .wait(500);
    }
});

fixture `receive_order page`.only
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });

test("receive_order view", async t => {
    await t
        .click(Selector(".common_goto").withAttribute("data_num_link", "2"))
        .expect(getLocation())
        .contains("receiveorder");
});
test("receive_order order execute", async t => {
    await t
        .navigateTo(receiveorder)
        .click(Selector(".receive_order_dflt_nav_btn").withText("発注一覧表"))
        .expect(Selector(".place_yellow_item_order").innerText)
        .eql("発注")
        .click(Selector(".place_yellow_item_order").withText("発注"))
        .expect(Selector(".place_yellow_item_order_confirm").innerText)
        .eql("発注")
        .click(Selector(".place_yellow_item_order_confirm").withText("発注"))
        .expect(Selector(".place_yellow_item_order_done_action").innerText)
        .eql("発注")
        .click(
            Selector(".place_yellow_item_order_done_action").withText("発注")
        )
        .expect(Selector(".place_yellow_item_order_success").innerText)
        .eql("入荷予定")
        .click(
            Selector(".place_yellow_item_order_success").withText("入荷予定")
        )
        .expect(Selector(".place_yellow_item_order_success_dones").innerText)
        .eql("確認")
        .wait(500);
});

fixture `customer_order page`.only
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });

test("customer_order view", async t => {
    await t
        .click(Selector(".common_goto").withAttribute("data_num_link", "3"))
        .expect(getLocation())
        .contains("shipment");
});
test("customer_order manual order page", async t => {
    await t
        .navigateTo(shipment)
        .click(Selector(".btn-warning").withText("オンライン受注"))
        .expect(Selector(".custom_online_order").innerText)
        .eql("手書")
        .click(Selector(".custom_online_order").withText("手書"))
        .expect(Selector(".custom_online_order").innerText)
        .eql("ｵﾝﾗｲﾝ");
});
test("customer_order manual order execute", async t => {
    var p_names = "伊藤園  充実野菜  緑黄色ミックス  ２００ｍｌ";
    var cutomer_manual_order_item = Selector("tr")
        .withAttribute("data_jan", jan)
        .find(".cmn_o_d_qty")
        .withAttribute("data_input_type", "ケース");
    await t
        .navigateTo(manualOrder)
        .click(Selector(".customer_list_show_popup").withText("販売先 一覧"))
        .expect(Selector(".customer_shop").innerText)
        .eql("店舗一覧")
        .click(Selector(".filter_by_customer_id").withText(customer_3))
        .expect(Selector(".jcs_main_hand_title").innerText)
        .eql(customer_3)
        .click(Selector(".jan_inpts"))
        .typeText(".jan_inpts", jan)
        .pressKey("enter")
        .typeText(cutomer_manual_order_item, "1")
        .click(Selector(".manual_order_exe").withText("完了"))
        .expect(Selector(".btn-primary").innerText)
        .eql("はい")
        .click(Selector(".btn-primary").withText("はい"))
        .wait(5000);
});
*/
fixture `vendor_management_sheet page`.only
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });
test("vendor_management_sheet view", async t => {
    await t
        .click(Selector(".receiveablebtn").withText("買掛"))
        .expect(Selector(".custm_uls li").innerText)
        .eql("買掛集計の期間設定をしますか？")
        .click(Selector("#current_date_pl"))
        .expect(getLocation())
        .contains("vendormangementsheet");
});

fixture `customer_management_sheet page`.only
    .beforeEach(async t => {
        await t.useRole(starting_page);
        // console.log('before');
    })
    .afterEach(async t => {
        // console.log('after');
    });
test("customer_management_sheet view", async t => {
    await t

        .click(Selector(".deliverablebtn").withText("売掛"))
        .expect(Selector(".custm_uls li").innerText)
        .eql("売掛集計の期間設定をしますか？")
        .click(Selector("#current_date_pl"))
        .expect(getLocation())
        .contains("shipmentmangementsheet");
});
/*
test
    ('vendor_master change', async t => {
        await t
            .navigateTo(vendor_master)
            .click(Selector('.add_new_vendor'))
            .expect(Selector('#maker_modal_heading').innerText).eql('仕入先情報');
    });
test
    ('vendor_master delete', async t => {
        await t
            .navigateTo(vendor_master)
            .click(Selector('.add_new_vendor'))
            .expect(Selector('#maker_modal_heading').innerText).eql('仕入先情報');
    });



fixture`My Fixture`
    .page(site_url);

test('check master', async t => {

    await t

        .maximizeWindow()
        .wait(500)
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.common_goto').withAttribute('data_num_link', '1'))
        .wait(15000)
        .click(Selector('.vendor_list_show_popup'))
        .wait(500)
        .click(Selector('.add_new_vendor'))
        .wait(500)
        .typeText('#vendor_name', vendor_3)
        .typeText('#vendor_code', Math.floor((Math.random() * 100000) + 1).toString())
        .typeText('#vendor_phone', phone)
        .click('.add_vendor_regs')
        .wait(500)
        .click(Selector('.btn-warning').withExactText('戻る'))
        .click(Selector('.jancode'))
        .typeText('.jancode', jan)
        .pressKey('enter')
        .wait(15000);

    if (!await Selector('.vendor_list_show_popup').withText('仕入先別').exists) {
        await t
            .selectText(Selector('.jancode'))
            .pressKey('delete')
            .typeText('.jancode', jan)
            .pressKey('enter')
            .wait(1000);
    }
    if (!await Selector('.vendor_list_show_popup').withText('仕入先別').exists) {
        await t
            .selectText(Selector('.jancode'))
            .pressKey('delete')
            .typeText('.jancode', jan)
            .pressKey('enter')
            .wait(1000);
    }

    if (!await Selector('.vendor_list_show_popup').withText('仕入先別').exists) {
        await t
            .selectText(Selector('.jancode'))
            .pressKey('delete')
            .typeText('.jancode', jan)
            .pressKey('enter')
            .wait(1000);
    }
    if (!await Selector('.vendor_list_show_popup').withText('仕入先別').exists) {
        await t
            .selectText(Selector('.jancode'))
            .pressKey('delete')
            .typeText('.jancode', jan)
            .pressKey('enter')
            .wait(1000);
    }
    if (await Selector('.vendor_list_show_popup').withText('仕入先別').exists) {
        await t
            .click(Selector('.vendor_list_show_popup').withText('仕入先別'))
            .wait(500);
        if (await Selector('.v_ids_v').value == '0') {
            await t
                .click(Selector('td.filter_by_vendor_id').withText(vendor_3))
                .wait(100)
                .wait(2000);
        }
        if (await Selector('.v_ids_v').value == '0') {
            await t
                .click(Selector('td.filter_by_vendor_id').withText(vendor_3))
                .wait(100)
                .wait(2000);
        }
        if (await Selector('.v_ids_v').value == '0') {
            await t
                .click(Selector('td.filter_by_vendor_id').withText(vendor_3))
                .wait(100)
                .wait(2000);
        }
        if (await Selector('.v_ids_v').value == '0') {
            await t
                .click(Selector('td.filter_by_vendor_id').withText(vendor_3))
                .wait(100)
                .wait(2000);
        }
        if (await Selector('td').withText(jan).parent('tr').find('.v_case_inputs').exists) {
            var case_inputs = Selector('td').withText(jan).parent('tr').find('.v_case_inputs');
            var ball_inputs = Selector('td').withText(jan).parent('tr').find('.v_ball_inputs');
            var v_cost_price = Selector('td').withText(jan).parent('tr').find('.v_cost_price');
            var v_in_company_code = Selector('td').withText(jan).parent('tr').find('.v_in_company_code');
            await t
                .selectText(case_inputs)
                .pressKey('delete')
                .typeText(case_inputs, '24')
                .selectText(ball_inputs)
                .pressKey('delete')
                .typeText(ball_inputs, '6')
                .selectText(v_cost_price)
                .pressKey('delete')
                .typeText(v_cost_price, '100')
                .selectText(v_in_company_code)
                .pressKey('delete')
                .typeText(v_in_company_code, Math.floor((Math.random() * 100000) + 1).toString())
                .wait(1000);
        }

    }

    await t
        .click(Selector('.page_manage'))
        .wait(5000)
        .click(Selector('.customer_list_show_popup'))
        .wait(5000)
        .click(Selector('.add_new_customer'));

    var shop_name = shop_list_array[Math.floor(Math.random() * shop_list_array.length)];
    const customerSelect = Selector('#customer_list');
    const customerOption = customerSelect.find('option');
    await t
        .typeText('#customer_name', customer_3)
        .typeText('#customer_code', Math.floor((Math.random() * 100000) + 1).toString())
        .typeText('#customer_phone', phone)
        .click('.add_customer_info')
        .wait(5000)
        .click(Selector('.customer_shop'))
        .wait(5000)

        .click('.add_new_shop')
        .wait(15000)
        .click(customerSelect)
        .click(customerOption.withText(customer_3))
        .wait(500)
        .typeText('#shop_code', Math.floor((Math.random() * 100000) + 1).toString())
        .typeText('#shop_name', shop_name)
        .typeText('#shop_address', 'Tokyo')
        .typeText('#postal_code', '1231')
        .typeText('#phone', '01936755674')
        .typeText('#email', 'user@jacos.co.jp')
        .typeText('#delivery_cycle', '1')
        .click(Selector('.add_shop_info'))
        .click(Selector('.custom_shop_close').withExactText('閉じる'))
        .click(Selector('.filter_by_customer_id').withText(customer_3))
        .click(Selector('.jancode'))
        .typeText('.jancode', jan)
        .pressKey("enter")
        .wait(5000);
    if (await Selector('td').withText(jan).parent('tr').find('.c_selling_price').exists) {
        var selling_price = Selector('td').withText(jan).parent('tr').find('.c_selling_price');
        await t
            .selectText(selling_price)
            .pressKey('delete')
            .typeText(selling_price, '120')
            .wait(500);
    }
    await t
        .expect(getLocation()).contains("customer_master");
});

test('vendor order check', async t => {
    await t
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.common_goto').withAttribute('data_num_link', '2'))
        .wait(15000)
        .click(Selector('.receive_order_dflt_nav_btn').withText('発注一覧表'))
        .wait(500)
        .click(Selector('.place_yellow_item_order').withText('発注'))
        .wait(500)
        .click(Selector('.place_yellow_item_order_confirm').withText('発注'))
        .wait(500)
        .click(Selector('.place_yellow_item_order_done_action').withText('発注'))
        .wait(500)
        .click(Selector('.place_yellow_item_order_success').withText('入荷予定'))
        .wait(5000)
        .expect(getLocation()).contains("receiveorder");
});

test('customer order check', async t => {

    var cutomer_manual_order_item = Selector('tr').withAttribute('data_jan', jan).find('.cmn_o_d_qty').withAttribute('data_input_type', 'ケース');
    await t
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.common_goto').withAttribute('data_num_link', '3'))
        .wait(10000)
        .click(Selector('.btn-warning').withText('オンライン受注'))
        .wait(10000)
        .click(Selector('.custom_online_order').withText('手書'))
        .wait(10000)
        .click(Selector('.customer_list_show_popup').withText('販売先 一覧'))
        .wait(5000)
        .click(Selector('.filter_by_customer_id').withText(customer_3))
        .wait(5000)
        .typeText('.jan_inpts', jan)
        .pressKey('enter')
        .wait(500)
        .typeText(cutomer_manual_order_item, '1')
        .click(Selector('.manual_order_exe').withText('完了'))
        .wait(500)
        .click(Selector('.btn-primary').withText('はい'))
        .wait(5000)
        .expect(getLocation()).contains("manualOrder");
});


test('receive handy order', async t => {
    await t
        .maximizeWindow()
        .wait(500)
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.btn-info').withText('ハンディー'))
        .wait(5000)
        .click(Selector('.col-md-11').withText('入荷'))
        .wait(1500);
    if (await Selector('.num_total').getAttribute('data_unreceived_total') != '0') {
        await t
            .click(Selector('#receive_inventorys_to_handy_recv_screen').withText('検品開始'))
            .wait(1500)
            .typeText('#vendor_master_jancode', jan)
            .pressKey("enter")
            .wait(5000);
        if (await Selector('.order_quantity').value != '') {
            await t
                .typeText('.receive_quantity', '1')
                .pressKey("enter")
                .wait(500)
                .pressKey("enter")
                .wait(500);
            if (await Selector('.reck_number').hasClass('hide')) {
                await t
                    .typeText('#reck_code', '22')
                    .pressKey("enter")
                    .wait(500)
                    .pressKey("enter")
                    .wait(2000);
            } else {
                await t
                    .click(Selector('#vendor_arival_insert_recv_order').withText('次の商品へ'))
                    .wait(2000);
            }
        }
        await t
            .wait(1000)
            .click(Selector('.btn-success').withText('入荷一覧'))
            .wait(2000);
    }
    await t
        .wait(1000)
        .click(Selector('.btn-primary').withText('メニュー'))
        .wait(2000)
        .expect(getLocation()).contains("android_home");
});


test('shipment handy order', async t => {
    await t
        .maximizeWindow()
        .wait(500)
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.btn-info').withText('ハンディー'))
        .wait(5000)
        .click(Selector('.col-md-11').withText('出荷'))
        .wait(1500)
        .click(Selector('.btn-warning').withText('検収開始'))
        .wait(1500)
        .typeText('#shipment_master_jancode', jan)
        .pressKey("enter")
        .wait(5000);
    if (await Selector('.order_quantity').value != '') {
        await t
            .typeText('.receive_quantity', '1')
            .pressKey("enter")
            .wait(500)
            .typeText('.shipment_note_1', '222')
            .wait(500)
            .pressKey("enter")
            .typeText('.note_2', '333')
            .wait(500)
            .pressKey("enter")
            .wait(500)
            .pressKey("enter")
            .wait(3000);
    }
    await t
        .click(Selector('.btn-info').withText('出荷一覧'))
        .wait(2000)
        .click(Selector('.btn-primary').withText('メニュー'))
        .expect(getLocation()).contains("android_home");
});


test('check vendor management sheet', async t => {
    await t
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.receiveablebtn').withText('買掛'))
        .wait(500)
        .click(Selector('#current_date_pl'))
        .wait(5000)
        .expect(getLocation()).contains("vendormangementsheet");
});

test('check customer management sheet', async t => {
    await t
        .setTestSpeed(web_speed)
        .useRole(starting_page)
        .wait(1500)
        .click(Selector('.deliverablebtn').withText('売掛'))
        .wait(500)
        .click(Selector('#current_date_pl'))
        .wait(5000)
        .expect(getLocation()).contains("shipmentmangementsheet");
});

*/