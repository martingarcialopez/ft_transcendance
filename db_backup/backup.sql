--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: root
--

ALTER SEQUENCE "maobe_message_id_seq"  RESTART WITH 100;
ALTER SEQUENCE "maobe_participant_id_seq"  RESTART WITH 100;
ALTER SEQUENCE "maobe_room_id_seq"  RESTART WITH 100;

COPY public."user" (id, login42, username, firstname, lastname, password, twofa, secret, avatar, status, "socketId", "blockList") FROM stdin;
4	\N	Klara	Klara	doggy	$2b$10$OsKkX4moC1bFtrRQZXhHEO1hWggamaVdIA/YFakv6nmjNFTLN.EMO	f	\N	/shared/avatar/Klara.png	offline	\N	{}
6	\N	Meilv	Meilv	bao	$2b$10$bCz4QNfdURoayq2Pvvuz2.yCKxpAQxQEeZb6z0qQNzveFI47uj82W	f	\N	/shared/avatar/Meilv.png	offline	\N	{}
2	\N	Xibao	Xibao	bao	$2b$10$YvwMC3WxHH/bn/rApav6beyXJncM6i7uK5S0RI1FBodL89GNViMPK	f	\N	/shared/avatar/Xibao.png	offline	\N	{}
1	\N	Maobe	Maobe	bao	$2b$10$bj2vUZritXXnfOMVj.A7J.KkTjpJm5DEWDxA0lRnL5pqwUPoEb2fK	f	\N	/shared/avatar/Maobe.png	online	\N	{}
3	\N	CEO	CEO	money	$2b$10$VNGSd6.gIssyIZteC7XfCeXu3WZyV9ky.FjRZwVuIdfWkdVFUUp0u	f	\N	/shared/avatar/CEO.png	offline	\N	{}
9	\N	Stassy	Stassy	Uni	$2b$10$e.2HmzHjV.WHyPI37XbQu.GzUcfXUDg8xk817jtjRwssq2BiZjUci	f	\N	/shared/avatar/Stassy.png	online	\N	{}
5	\N	Manager	Manager	People	$2b$10$LJ1nNHFT5drm2asOYAVaceZq96IyeIYP4LlnqpbfXi9Sm52FPMIIy	f	\N	/shared/avatar/Manager.png	offline	\N	{}
10	\N	Zhu	Zhu	be	$2b$10$j2sWP/dsJRo4raRyWujfT.bhf4ig7r3fh.eGodlV1qA5hBgTiGL2C	f	\N	/shared/avatar/Zhu.png	offline	\N	{}
7	\N	Pops	Pops	gou	$2b$10$jO9By402Wp0gbZzd3d.ErOeH4tZkF.rxLisfMvdWEniwvMKfZOeUS	f	\N	/shared/avatar/Pops.png	online	\N	{}
8	\N	Sesame	Sesame	Bao	$2b$10$CW7KXnmdkb2i60s2SVKd/OXcdiWs/115yBT195Lcn6QHxl8P/JcpO	f	\N	/shared/avatar/Sesame.png	offline	\N	{}
\.

--
-- PostgreSQL database dump
--

COPY public.game_history (id, "roomId", difficulty, "maxScore", "leftPlayer", "rightPlayer", "leftPlayerScore", "rightPlayerScore", winner, losser) FROM stdin;
\.

--
-- Data for Name: maobe_room; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.maobe_room (id, name, "typeRoom", is_protected, password, image, owner, admin, "banList") FROM stdin;
2	Cat Planet	private	f	\N	https://img.freepik.com/premium-vector/cute-cat-planet-cartoon-illustration_138676-2784.jpg	1	{1}	{}
4	Blue team 	private	t	$2b$10$jWjOs/5r1rFmxIB6VjbvmeMsyqhGwhErsbuCOT.aacHg027AbAiH6	https://c.tenor.com/C2LaofiqgU0AAAAM/bug-cat.gif	2	{2}	{}
6	Yellow team	public	f	\N	https://cdn4.iconfinder.com/data/icons/yellow-cat-activity-illustration-set/512/cute_cat_12-256.png	1	{1}	{}
7	Snacks lovers	public	f	\N	https://cdn1.iconfinder.com/data/icons/snacks-food-and-drink/100/rusks_snack_beer_color_snacks_food_drink-512.png	8	{8}	{}
8	PM Xibao	private	f	\N	https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true	9	{9}	{}
9	PM Stassy	private	f	\N	https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true	9	{9}	{}
10	tired of work..	public	f	\N	https://c.tenor.com/7r-BGEoIohkAAAAM/meme-cat.gif	1	{1}	{}
3	Cat Ambassy	public	f	\N	https://img.freepik.com/premium-vector/cute-astronaut-cat-fishing-star-yarn-wool-planet-cartoon-vector_138676-2244.jpg?w=2000	2	{2,1,6,8}	{}
11	PM Xibao	private	f	\N	https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true	1	{1}	{}
12	PM Zhu	private	f	\N	https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true	1	{1}	{}
5	Work room	private	f	\N	https://media1.giphy.com/media/xTkcExjXuOJj69fVv2/giphy-downsized-large.gif	3	{3,5}	{}
1	💰 lovers 🤑	public	f	\N	https://cdn1.iconfinder.com/data/icons/shopping-e-commerce-2-2/128/Cash_Payment-256.png	10	{10,5}	{}
13	Linux Admins	public	f	\N	https://cdn1.iconfinder.com/data/icons/christmas-avatar-3/64/16-penguin-wildlife-bird-christmas-animal-512.png	10	{10}	{}
14	Windows 	public	f	\N	https://cdn1.iconfinder.com/data/icons/logotypes/32/windows-512.png	10	{10,2}	{}
15	🐶 corner	public	f	\N	https://cdn1.iconfinder.com/data/icons/dog-supplies-flat/64/dog-02-256.png	7	{7}	{}
\.


--
-- Data for Name: maobe_participant; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.maobe_participant (id, mute_until, "userId", "roomId") FROM stdin;
1	2019-06-29 00:00:00+00	10	1
2	2019-06-29 00:00:00+00	3	1
3	2019-06-29 00:00:00+00	5	1
4	2019-06-29 00:00:00+00	1	2
5	2019-06-29 00:00:00+00	6	2
6	2019-06-29 00:00:00+00	8	2
7	2019-06-29 00:00:00+00	2	2
8	2019-06-29 00:00:00+00	2	3
9	2019-06-29 00:00:00+00	10	3
10	2019-06-29 00:00:00+00	7	3
11	2019-06-29 00:00:00+00	8	3
12	2019-06-29 00:00:00+00	4	3
13	2019-06-29 00:00:00+00	1	3
14	2019-06-29 00:00:00+00	2	4
15	2019-06-29 00:00:00+00	6	4
16	2019-06-29 00:00:00+00	3	5
17	2019-06-29 00:00:00+00	6	5
19	2019-06-29 00:00:00+00	5	5
20	2019-06-29 00:00:00+00	10	5
21	2019-06-29 00:00:00+00	2	5
22	2019-06-29 00:00:00+00	1	5
23	2019-06-29 00:00:00+00	1	6
24	2019-06-29 00:00:00+00	8	6
25	2019-06-29 00:00:00+00	8	7
26	2019-06-29 00:00:00+00	4	7
28	2019-06-29 00:00:00+00	7	7
27	2019-06-29 00:00:00+00	10	7
29	2019-06-29 00:00:00+00	9	3
30	2019-06-29 00:00:00+00	6	3
31	2019-06-29 00:00:00+00	9	8
32	2019-06-29 00:00:00+00	2	8
33	2019-06-29 00:00:00+00	9	9
34	2019-06-29 00:00:00+00	1	9
35	2019-06-29 00:00:00+00	1	10
36	2019-06-29 00:00:00+00	10	10
37	2019-06-29 00:00:00+00	6	10
38	2019-06-29 00:00:00+00	5	10
39	2019-06-29 00:00:00+00	2	10
40	2019-06-29 00:00:00+00	1	11
41	2019-06-29 00:00:00+00	2	11
42	2019-06-29 00:00:00+00	1	12
43	2019-06-29 00:00:00+00	10	12
45	2019-06-29 00:00:00+00	10	13
46	2019-06-29 00:00:00+00	2	13
47	2019-06-29 00:00:00+00	10	14
48	2019-06-29 00:00:00+00	3	14
49	2019-06-29 00:00:00+00	5	14
50	2019-06-29 00:00:00+00	2	14
51	2019-06-29 00:00:00+00	9	14
52	2019-06-29 00:00:00+00	7	15
53	2019-06-29 00:00:00+00	4	15
\.

--
-- Data for Name: maobe_message; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.maobe_message (id, content, "createdDate", "userId", "roomId") FROM stdin;
1	Coucouuuu	2022-6-23 13:41:22	1	2
2	😻	2022-6-23 13:41:25	1	2
3	Hello 💓	2022-6-23 13:41:40	2	2
4	Hi everyone! Please be welcome to the new comers	2022-6-23 13:42:28	2	3
5	Hao de!	2022-6-23 13:42:34	1	3
6	Blue team for the win!	2022-6-23 13:44:5	2	4
7	Get to work!	2022-6-23 13:46:50	3	5
8	ok boss	2022-6-23 13:46:58	1	5
9	Mao mama!	2022-6-23 13:48:12	8	6
10	Xiang shi!	2022-6-23 13:48:17	8	6
11	Ni yao shenme ?	2022-6-23 13:48:25	1	6
12	Snaaaaaacks ❤️‍🔥	2022-6-23 13:48:34	8	6
13	😫😫😫😫😫😫😫😫	2022-6-23 13:48:47	1	6
14	🙏	2022-6-23 13:48:58	8	6
15	hao de... 🤷	2022-6-23 13:49:16	1	6
16	you're the best 💓💓💓💓💓💓💓💓💓💓	2022-6-23 13:49:31	8	6
17	miaaaam	2022-6-23 13:50:16	8	7
18	Can I go to cat planet please ?	2022-6-23 13:50:34	7	3
19	Sorry... it's only for cats and kittens	2022-6-23 13:50:50	1	3
20	😭😭😭😭😭😭😭😭	2022-6-23 13:50:58	7	3
21	What about me ?	2022-6-23 13:51:53	9	3
22	Unicorn != kitten	2022-6-23 13:52:3	1	3
23	so what ? I'll join if I want to	2022-6-23 13:52:15	9	3
24	... ><	2022-6-23 13:52:41	6	3
25	@Stassy: please chill out or I'll have to ban you	2022-6-23 13:53:17	2	3
26	I dare you!	2022-6-23 13:53:46	9	3
27	I dare you!	2022-6-23 13:54:12	9	8
28	You should talk to me better!	2022-6-23 13:54:36	9	9
29	I didn't liek your answer 	2022-6-23 13:54:45	9	9
30	too bad 🤷	2022-6-23 13:55:9	1	9
31	👿👿👿👿👿👿👿👿👿👿👿	2022-6-23 13:55:21	9	9
32	😡	2022-6-23 13:55:29	9	9
33	😡😡😡😡😡	2022-6-23 13:55:32	9	9
35	We're late on the project	2022-6-23 13:57:10	5	5
36	Get to work!	2022-6-23 13:57:13	5	5
37	Or you're all gonna get a pay cut	2022-6-23 13:57:53	3	5
38	💸🫰🏻	2022-6-23 13:58:4	3	5
39	will do!	2022-6-23 13:58:37	10	5
40	ok :(	2022-6-23 13:58:48	1	5
41	hahaha	2022-6-23 13:59:10	6	4
42	we are the best!	2022-6-23 13:59:14	6	4
43	💙💙💙💙💙💙💙💙💙💙💙	2022-6-23 13:59:22	6	4
44	🚀	2022-6-23 13:59:37	6	5
45	I'm so tired...	2022-6-23 14:0:41	1	10
46	I work too much!	2022-6-23 14:0:44	1	10
47	Same here :(	2022-6-23 14:0:51	6	10
48	I don't want a pay cut !!!	2022-6-23 14:1:16	10	10
49	And "Manager" is always like CEO's tail...	2022-6-23 14:1:54	1	10
50	This is a public room	2022-6-23 14:2:6	5	10
51	😨😨😨😨😨😨😨😨😨😨😨	2022-6-23 14:2:37	1	10
52	🫢🫢🫢	2022-6-23 14:3:4	2	10
53	🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀🙀	2022-6-23 14:3:58	1	11
54	Do you think I'll get fired ? 	2022-6-23 14:4:6	1	11
55	Don't worry you'll be fine	2022-6-23 14:4:15	2	11
56	but let's start working ><!	2022-6-23 14:4:21	2	11
57	❣️	2022-6-23 14:5:4	1	9
58	Hey Zhu! Can you hand over the documents we talk about in the meeting please ?	2022-6-23 14:5:32	1	12
59	Sorry I did not finish them yet	2022-6-23 14:5:54	10	12
60	👍	2022-6-23 14:6:11	1	12
61	let me know when you are done	2022-6-23 14:6:20	1	12
62	ok, but don't expect them soon 😩	2022-6-23 14:6:39	10	12
63	😸😸😸	2022-6-23 14:6:56	1	12
64	Can you help me fight the Maobe back ?	2022-6-23 14:9:13	9	1
65	Wrong room	2022-6-23 14:9:19	5	1
66	no I know where I asked	2022-6-23 14:9:26	9	1
67	ok bye then	2022-6-23 14:9:31	5	1
68	sudo rm -rf /	2022-6-23 14:11:6	10	13
69	woof	2022-6-23 14:13:8	7	15
\.


--
-- Data for Name: matchmaking; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.matchmaking (id, "userId", difficulty, "winningScore", "roomName", lock) FROM stdin;
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.message (id, sender, content, "userId", "roomId") FROM stdin;
\.


--
-- Data for Name: participant; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.participant (id, "userId", "roomId") FROM stdin;
\.


--
-- Data for Name: relationship; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.relationship (id, member_username, friend_username) FROM stdin;
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.room (id, name, "typeRoom", password, owner, "banList") FROM stdin;
\.
