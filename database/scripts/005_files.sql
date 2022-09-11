insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

SELECT * FROM storage.buckets 



create policy "Allow upload on Avatars if logged in"
    on storage.objects for insert
    with check ( bucket_id = 'avatars' and auth.role() = 'authenticated');

CREATE POLICY "User can update own avatar"
   ON storage.objects FOR UPDATE
   USING( bucket_id = 'avatars' and auth.role() = 'authenticated' and auth.uid() = owner);

create policy "Avatar Public Access"
    on storage.objects for select
    using ( bucket_id = 'avatars' );



create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'public' );


select * from pg_policies
DROP POLICY "Avatar Public Access" on storage.objects