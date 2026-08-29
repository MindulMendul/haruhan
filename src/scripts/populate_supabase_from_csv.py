"""
이 스크립트는 CSV 파일의 데이터를 Supabase 테이블에 채워 넣습니다.

사전 요구 사항:
- Python 3.x
- pandas 라이브러리 (`pip install pandas`)
- supabase-py 라이브러리 (`pip install supabase`)
- python-dotenv 라이브러리 (`pip install python-dotenv`)
- 프로젝트 루트에 다음 변수들을 포함하는 .env.local 파일:
  - EXPO_PUBLIC_SUPABASE_URL: Supabase 프로젝트 URL.
  - EXPO_PUBLIC_SUPABASE_SECRET_KEY: Supabase 시크릿 키 (service_role).

사용법:
1. 이 스크립트의 `TABLE_NAME` 변수를 Supabase 테이블 이름으로 설정합니다.
2. `if __name__ == "__main__":` 블록 안의 `CSV_FILE_PATH` 변수를 설정합니다.
3. 터미널에서 스크립트를 실행합니다: `python lib/populate_supabase_from_csv.py`
"""

import os

import pandas as pd
from dotenv import load_dotenv
from supabase import Client, create_client

# .env.local 파일로부터 환경 변수를 로드합니다.
load_dotenv(dotenv_path=".env.local")

# -----------------------------------------------------------
# 1. 설정 (Supabase 대시보드 -> Settings -> API 에서 확인)
# -----------------------------------------------------------
SUPABASE_URL = os.environ.get("EXPO_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("EXPO_PUBLIC_SUPABASE_SECRET_KEY")
TABLE_NAME = "your_table_name"  # <<< 여기에 테이블 이름을 설정하세요


def populate_table_from_csv(csv_path: str, table_name: str, supabase_client: Client):
    """
    CSV 파일에서 데이터를 읽어 지정된 Supabase 테이블에 삽입합니다.

    Args:
        csv_path (str): CSV 파일의 경로.
        table_name (str): Supabase에 있는 대상 테이블의 이름.
        supabase_client (Client): 초기화된 Supabase 클라이언트 인스턴스.
    """
    try:
        df = pd.read_csv(csv_path)
        records = df.to_dict(orient="records")

        print(
            f"'{csv_path}' 파일에서 '{table_name}' 테이블로 {len(records)}개의 레코드 삽입을 시도합니다..."
        )

        data, error = supabase_client.table(table_name).insert(records).execute()

        if error[1]:
            print(f"데이터 삽입 중 오류 발생: {error[1]}")
        else:
            print(f"성공적으로 {len(data[1])}개의 레코드를 삽입했습니다.")
    except FileNotFoundError:
        print(f"오류: '{csv_path}' 파일을 찾을 수 없습니다.")
    except Exception as e:
        print(f"예상치 못한 오류가 발생했습니다: {e}")


if __name__ == "__main__":
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError(".env.local 파일에 Supabase URL과 Key를 설정해야 합니다.")

    # Supabase 클라이언트 생성
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    # --- 여기에 CSV 파일 경로를 지정하세요 ---
    CSV_FILE_PATH = "path/to/your/data.csv"  # <<< 여기에 CSV 파일 경로를 설정하세요

    if TABLE_NAME == "your_table_name" or CSV_FILE_PATH == "path/to/your/data.csv":
        print("스크립트를 실행하기 전에 'TABLE_NAME'과 'CSV_FILE_PATH'를 수정해주세요.")
    else:
        populate_table_from_csv(CSV_FILE_PATH, TABLE_NAME, supabase)
