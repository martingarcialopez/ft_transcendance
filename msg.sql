insert into message values
	   (DEFAULT, 'first message', 1, 6)
	   (DEFAULT, 'scd message', 1, 6)
	   (DEFAULT, 'third message', 1, 6)
	   (DEFAULT, 'fourth message', 1, 6)
	   (DEFAULT, 'fifth message', 1, 6);


---insert user----
insert into "user" values (default, 'student5', 'maobe', 'maobe', 'maobe', default, default, default, '{}')


---insert room---
insert into maoberoom values(default, 'sesame room', 'public', default, 1, '{1}', '{}');
insert into maobe_room values(default, 'meilv room', 'public', default, 2, '{2}', '{}');
insert into maobe_room values(default, 'pops room', 'public', default, default, 6, '{6}', '{}');

---insert participant---
insert into maobe_participant values(default, 1, 1);
