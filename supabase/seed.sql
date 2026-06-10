insert into public.stores (id, name, area, station, description, status)
values
('00000000-0000-0000-0000-000000000001', 'LUXE SHINJUKU', '新宿', '新宿三丁目', '高級感と安心感を重視した店舗です。', 'active')
on conflict (id) do nothing;

insert into public.talents (id, store_id, name, age, area, profile, tags, price, schedule, ai_score, status)
values
('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'れいな', 24, '新宿', '優しい雰囲気で初めての方にもおすすめです。', array['清楚系','癒し系','本日出勤'], 18000, '本日 12:00-22:00', 96, 'active'),
('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'みお', 27, '新宿', '会話が楽しく落ち着いた時間を過ごせます。', array['お姉さん系','会話上手'], 26000, '本日 14:00-23:00', 93, 'active')
on conflict (id) do nothing;


-- Store members require real auth user ids after Supabase Auth users are created.
-- Example:
-- insert into public.profiles (id, email, role, store_id)
-- values ('<auth-user-id>', 'store@example.com', 'store_admin', '00000000-0000-0000-0000-000000000001');
-- insert into public.store_members (store_id, user_id, role)
-- values ('00000000-0000-0000-0000-000000000001', '<auth-user-id>', 'owner');
