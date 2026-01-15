"""
"T", "D" 컬럼을 가진 CSV 파일을 Supabase 데이터베이스 테이블에
삽입하는 스크립트입니다.

이 스크립트는 다음 작업을 수행합니다.
1. 지정된 CSV 파일을 pandas DataFrame으로 읽어옵니다.
2. "T"(용어)와 "D"(정의) 컬럼을 선택하고, 컬럼명을 "term"과
"definition"으로 변경합니다.
3. "term" 컬럼에 데이터가 없는 행을 제거합니다.
4. Supabase 클라이언트를 초기화하고, 처리된 데이터를 지정된 테이블
(TABLE_NAME)에 삽입합니다.

사용 전 확인 사항:
- SUPABASE_URL, SUPABASE_KEY, TABLE_NAME 상수가 올바르게 설정되었는지
확인하세요.
- `df = pd.read_csv("")`의 인용 부호 안에 유효한 CSV 파일 경로를
입력해야 합니다.

필요 라이브러리:
- pandas
- supabase-client
"""

import pandas as pd
from supabase import Client, create_client

# -----------------------------------------------------------
# 1. 설정 (Supabase 대시보드 -> Settings -> API에서 확인)
# -----------------------------------------------------------
SUPABASE_URL = "https://rpadoztnlpvusvnwjwhf.supabase.co"
SUPABASE_KEY = "sb_secret_WOdwKbkk-jmE2vglrGKirA_0rJte89w"  # 데이터를 써야 하므로 service_role 키 권장
TABLE_NAME = ""  # 위에서 정한 테이블 이름

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# -----------------------------------------------------------
# 2. 데이터 준비
# -----------------------------------------------------------
# CSV 파일 읽기(ex. "C:\\Users\\thong\\Downloads\\네트워크.csv")
df = pd.read_csv("")  # CSV 파일 경로 입력하여 읽어옴

# 필요한 컬럼만 선택하고 이름 변경 (T -> term, D -> definition)
df_clean = df[["T", "D"]].rename(columns={"T": "term", "D": "definition"})

# (선택) 데이터가 없는 행 제거
df_clean = df_clean.dropna(subset=["term"])

# DataFrame을 딕셔너리 리스트로 변환 (Supabase가 이해하는 형식)
data_to_insert = df_clean.to_dict(orient="records")

# -----------------------------------------------------------
# 3. 데이터 삽입
# -----------------------------------------------------------
try:
    response = supabase.table(TABLE_NAME).insert(data_to_insert).execute()

    print(
        f"성공! {len(data_to_insert)}개의 데이터가 '{TABLE_NAME}' 테이블에 저장되었습니다."
    )
except Exception as e:
    print(f"업로드 실패: {e}")
