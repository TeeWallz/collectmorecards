create or replace function add (i integer, j integer)
  returns integer
  language plpgsql
  as
  $$
    begin
      return i + j;
    end;
  $$